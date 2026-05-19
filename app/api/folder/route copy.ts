// // app/api/vocabulary/common/route.ts
// import { NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";

// const jsonPath = path.join(
//   process.cwd(),
//   "lib",
//   "data",
//   "english",
//   "folder.json",
// );

// export async function POST(request: Request) {
//   console.log("Received folders data:");
//   try {
//     const body = await request.json();
//     const { folders } = body;

//     if (!folders || !Array.isArray(folders)) {
//       return NextResponse.json(
//         { error: "Invalid data format" },
//         { status: 400 },
//       );
//     }

//     // // Ensure directory exists
//     const dir = path.dirname(jsonPath);
//     await fs.mkdir(dir, { recursive: true });

//     // // Write the updated data
//     await fs.writeFile(jsonPath, JSON.stringify({ folders }, null, 2), "utf-8");

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error saving folders:", error);
//     return NextResponse.json(
//       { error: "Failed to save folders data" },
//       { status: 500 },
//     );
//   }
// }

// export async function GET() {
//   try {
//     const fileContents = await fs.readFile(jsonPath, "utf-8");
//     const data = JSON.parse(fileContents);
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to read folders data" },
//       { status: 500 },
//     );
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                                   PATCH                                    */
// /* -------------------------------------------------------------------------- */

// export async function PATCH(request: Request) {
//   try {
//     const body = await request.json();

//     const { id, updatedFolder } = body;

//     if (!id || !updatedFolder) {
//       return NextResponse.json(
//         { error: "id and updatedFolder are required" },
//         { status: 400 },
//       );
//     }

//     // Read existing file
//     const fileContents = await fs.readFile(jsonPath, "utf-8");

//     const data = JSON.parse(fileContents);

//     // Update folder
//     const updatedFolders = data.folders.map((folder: any) =>
//       String(folder.id) === String(id)
//         ? { ...folder, ...updatedFolder }
//         : folder,
//     );

//     // Save updated file
//     await fs.writeFile(
//       jsonPath,
//       JSON.stringify({ folders: updatedFolders }, null, 2),
//       "utf-8",
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Folder updated successfully",
//     });
//   } catch (error) {
//     console.error("Error updating folders:", error);

//     return NextResponse.json(
//       { error: "Failed to update folders data" },
//       { status: 500 },
//     );
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                                   DELETE                                   */
// /* -------------------------------------------------------------------------- */
// export async function DELETE(request: Request) {
//   try {
//     const body = await request.json();

//     const { id } = body;

//     if (!id) {
//       return NextResponse.json(
//         { error: "Folder id is required" },
//         { status: 400 },
//       );
//     }

//     // Read existing file
//     const fileContents = await fs.readFile(jsonPath, "utf-8");

//     const data = JSON.parse(fileContents);

//     // Remove folder
//     const filteredFolders = data.folders.filter(
//       (folder: any) => String(folder.id) !== String(id),
//     );

//     // Save updated file
//     await fs.writeFile(
//       jsonPath,
//       JSON.stringify({ folders: filteredFolders }, null, 2),
//       "utf-8",
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Folder deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting folders:", error);

//     return NextResponse.json(
//       { error: "Failed to delete folders data" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const jsonPath = path.join(
  process.cwd(),
  "lib",
  "data",
  "english",
  "folders.json",
);

// Ensure directory exists helper
async function ensureDirectoryExists() {
  const dir = path.dirname(jsonPath);
  await fs.mkdir(dir, { recursive: true });
}

// Read data helper
async function readData() {
  try {
    const fileContents = await fs.readFile(jsonPath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    // If file doesn't exist, return empty structure
    return { folders: [], subCategories: [], entries: [] };
  }
}

// Write data helper
async function writeData(data: any) {
  await ensureDirectoryExists();
  await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), "utf-8");
}

/* -------------------------------------------------------------------------- */
/*                                   GET                                      */
/* -------------------------------------------------------------------------- */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'folders', 'subCategories', 'entries'
    const category = searchParams.get("category");
    const folderId = searchParams.get("folderId");

    const data = await readData();

    let responseData = data;

    // If specific type is requested
    if (type && data[type]) {
      responseData = data[type];

      // Filter by category if provided
      if (category && type === "folders") {
        responseData = responseData.filter(
          (item: any) => item.category === category,
        );
      }

      // Filter by folderId if provided
      if (folderId && type === "subCategories") {
        responseData = responseData.filter(
          (item: any) => item.parentFolderId === folderId,
        );
      }

      if (folderId && type === "entries") {
        responseData = responseData.filter(
          (item: any) => item.folderId === folderId,
        );
      }
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error reading data:", error);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

/* -------------------------------------------------------------------------- */
/*                                   POST                                     */
/* -------------------------------------------------------------------------- */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data: itemData } = body;

    if (!type || !itemData) {
      return NextResponse.json(
        { error: "type and data are required" },
        { status: 400 },
      );
    }

    const data = await readData();

    // Initialize array if it doesn't exist
    if (!data[type]) {
      data[type] = [];
    }

    // Add unique ID if not present
    if (!itemData.id) {
      itemData.id = `${type.slice(0, -1)}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Add timestamps
    if (!itemData.createdAt) {
      itemData.createdAt = new Date().toISOString();
    }

    data[type].push(itemData);
    await writeData(data);

    return NextResponse.json({
      success: true,
      data: itemData,
      message: `${type} created successfully`,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}

/* -------------------------------------------------------------------------- */
/*                                   PATCH                                    */
/* -------------------------------------------------------------------------- */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { type, id, updates } = body;

    if (!type || !id || !updates) {
      return NextResponse.json(
        { error: "type, id, and updates are required" },
        { status: 400 },
      );
    }

    const data = await readData();

    if (!data[type]) {
      return NextResponse.json({ error: `${type} not found` }, { status: 404 });
    }

    const itemIndex = data[type].findIndex(
      (item: any) => String(item.id) === String(id),
    );

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Update the item
    data[type][itemIndex] = {
      ...data[type][itemIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await writeData(data);

    return NextResponse.json({
      success: true,
      data: data[type][itemIndex],
      message: `${type} updated successfully`,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 },
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
      return NextResponse.json(
        { error: "type and id are required" },
        { status: 400 },
      );
    }

    const data = await readData();

    if (!data[type]) {
      return NextResponse.json({ error: `${type} not found` }, { status: 404 });
    }

    // Filter out the item
    const originalLength = data[type].length;
    data[type] = data[type].filter(
      (item: any) => String(item.id) !== String(id),
    );

    if (data[type].length === originalLength) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // If deleting a folder, also delete its subcategories and entries
    if (type === "folders") {
      data.subCategories =
        data.subCategories?.filter(
          (sub: any) => String(sub.parentFolderId) !== String(id),
        ) || [];
      data.entries =
        data.entries?.filter(
          (entry: any) => String(entry.folderId) !== String(id),
        ) || [];
    }

    // If deleting a subcategory, also delete entries in that subcategory
    if (type === "subCategories") {
      data.entries =
        data.entries?.filter(
          (entry: any) => String(entry.subCategoryId) !== String(id),
        ) || [];
    }

    await writeData(data);

    return NextResponse.json({
      success: true,
      message: `${type} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 },
    );
  }
}
