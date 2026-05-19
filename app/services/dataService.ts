// Services for handling data operations

import {
  CategorySubEntry,
  Folder,
  SubCategory,
  WritingEntry,
} from "@/lib/types/folders";

const API_BASE_URL = "/api/";
const USE_API = true; // Set to true to use API, false for localStorage

class DataService {
  private useApi: boolean;
  constructor() {
    this.useApi = USE_API;
    // this.name = "DataService";
  }

  async request(endpoint: string, options: RequestInit = {}) {
    if (!this.useApi) {
      return this.localStorageRequest(endpoint, options);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      // Fallback to localStorage if API fails
      return this.localStorageRequest(endpoint, options);
    }
  }

  async localStorageRequest(
    endpoint: string,
    options: RequestInit,
  ): Promise<any> {
    const url = new URL(endpoint, "http://localhost");

    const type = url.searchParams.get("type") as
      | "folders"
      | "subCategories"
      | "entries";

    const STORAGE_KEYS = {
      folders: "wisdom-folders",
      subCategories: "wisdom-subcategories",
      entries: "wisdom-entries",
    };

    switch (options.method) {
      case "GET": {
        const data = localStorage.getItem(STORAGE_KEYS[type]);

        return data ? JSON.parse(data) : [];
      }

      case "POST": {
        const postBody: {
          type: "folders" | "subCategories" | "entries";
          data: any;
        } = JSON.parse(options.body as string);
        const postData = localStorage.getItem(STORAGE_KEYS[postBody.type]);
        const postItems = postData ? JSON.parse(postData) : [];
        const newItem = {
          ...postBody.data,
          id: `${postBody.type.slice(0, -1)}-${Date.now()}`,
        };

        postItems.push(newItem);

        localStorage.setItem(
          STORAGE_KEYS[postBody.type],
          JSON.stringify(postItems),
        );

        return {
          success: true,
          data: newItem,
        };
      }

      case "PATCH": {
        const patchBody: {
          type: "folders" | "subCategories" | "entries";
          id: string;
          updates: Partial<any>;
        } = JSON.parse(options.body as string);

        const patchData = localStorage.getItem(STORAGE_KEYS[patchBody.type]);

        const patchItems = patchData ? JSON.parse(patchData) : [];

        const patchIndex = patchItems.findIndex(
          (i: any) => String(i.id) === String(patchBody.id),
        );

        if (patchIndex !== -1) {
          patchItems[patchIndex] = {
            ...patchItems[patchIndex],
            ...patchBody.updates,
          };

          localStorage.setItem(
            STORAGE_KEYS[patchBody.type],
            JSON.stringify(patchItems),
          );
        }

        return { success: true };
      }

      case "DELETE": {
        const deleteParams = Object.fromEntries(url.searchParams);

        const deleteData = localStorage.getItem(
          STORAGE_KEYS[
            deleteParams.type as "folders" | "subCategories" | "entries"
          ],
        );

        const deleteItems = deleteData ? JSON.parse(deleteData) : [];

        const filteredItems = deleteItems.filter(
          (i: any) => String(i.id) !== String(deleteParams.id),
        );

        localStorage.setItem(
          STORAGE_KEYS[
            deleteParams.type as "folders" | "subCategories" | "entries"
          ],
          JSON.stringify(filteredItems),
        );

        return { success: true };
      }

      default:
        return null;
    }
  }

  // Folders
  async getFolders(category: string | null = null): Promise<Folder[]> {
    let endpoint = `folder?type=folders`;
    if (category) {
      endpoint += `&category=${category}`;
    }
    return this.request(endpoint, { method: "GET" });
  }

  async createFolder(folderData: Folder) {
    return this.request("folder", {
      method: "POST",
      body: JSON.stringify({
        type: "folders",
        data: folderData,
      }),
    });
  }

  async updateFolder(folderId: string, updates: Partial<Folder>) {
    return this.request("folder", {
      method: "PATCH",
      body: JSON.stringify({
        type: "folders",
        id: folderId,
        updates,
      }),
    });
  }

  async deleteFolder(folderId: string) {
    return this.request(`folder?type=folders&id=${folderId}`, {
      method: "DELETE",
    });
  }

  // SubCategories
  async getSubCategories(folderId?: string): Promise<SubCategory[]> {
    let endpoint = `folder?type=subCategories`;
    if (folderId) {
      endpoint += `&folderId=${folderId}`;
    }
    return this.request(endpoint, { method: "GET" });
  }

  async createSubCategory(subCategoryData: SubCategory) {
    return this.request("folder", {
      method: "POST",
      body: JSON.stringify({
        type: "subCategories",
        data: subCategoryData,
      }),
    });
  }

  async updateSubCategory(
    subCategoryId: string,
    updates: Partial<SubCategory>,
  ) {
    return this.request("folder", {
      method: "PATCH",
      body: JSON.stringify({
        type: "subCategories",
        id: subCategoryId,
        updates,
      }),
    });
  }

  async deleteSubCategory(subCategoryId: string) {
    return this.request(`folder?type=subCategories&id=${subCategoryId}`, {
      method: "DELETE",
    });
  }

  // Entries
  async getEntries(folderId?: string): Promise<WritingEntry[]> {
    let endpoint = `folder?type=entries`;
    if (folderId) {
      endpoint += `&folderId=${folderId}`;
    }
    return this.request(endpoint, { method: "GET" });
  }

  async createEntry(entryData: WritingEntry) {
    return this.request("folder", {
      method: "POST",
      body: JSON.stringify({
        type: "entries",
        data: entryData,
      }),
    });
  }

  async updateEntry(entryId: string, updates: Partial<WritingEntry>) {
    return this.request("folder", {
      method: "PATCH",
      body: JSON.stringify({
        type: "entries",
        id: entryId,
        updates,
      }),
    });
  }

  async deleteEntry(entryId: string) {
    return this.request(`folder?type=entries&id=${entryId}`, {
      method: "DELETE",
    });
  }

  async toggleFavorite(entryId: string) {
    return this.updateEntry(entryId, { isFavorite: true }); // You'll need to get current state
  }

  // // Initialize with mock data
  // async initializeData() {
  //   // Check if data exists
  //   const folders = await this.getFolders();
  //   if (folders.length === 0) {
  //     // Import mock data
  //     const mockData = await import("./mockData.json");
  //     for (const folder of mockData.default.folders) {
  //       await this.createFolder(folder);
  //     }
  //     for (const subCategory of mockData.default.subCategories) {
  //       await this.createSubCategory(subCategory);
  //     }
  //     for (const entry of mockData.default.entries) {
  //       await this.createEntry(entry);
  //     }
  //   }
  //   return this.getAllData();
  // }

  async getAllData(): Promise<CategorySubEntry> {
    const [folders, subCategories, entries] = await Promise.all([
      this.getFolders(),
      this.getSubCategories(),
      this.getEntries(),
    ]);
    return { folders, subCategories, entries };
  }
}

const dataService = new DataService();
export default dataService;
