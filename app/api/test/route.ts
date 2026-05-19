// // app/api/vocabulary/common/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { SynonymFamily } from "@/lib/types/vocabTypes";

const jsonPath = path.join(
  process.cwd(),
  "lib",
  "data",
  "english",
  "groupedVocab.json",
);

// Ensure directory exists helper
async function ensureDirectoryExists() {
  const dir = path.dirname(jsonPath);
  await fs.mkdir(dir, { recursive: true });
}

// Read data helper
async function readData(): Promise<{ families: SynonymFamily[] }> {
  try {
    const fileContents = await fs.readFile(jsonPath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    const defaultData = { families: [] };
    await fs.writeFile(jsonPath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
}

// Write data helper
async function writeData(data: { families: SynonymFamily[] }) {
  await ensureDirectoryExists();
  await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const data = await readData();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch grouped vocabulary" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, family, word, familyId } = body;

    const data = await readData();

    if (action === "createFamily") {
      console.log(action);
      // Create new family
      const newFamily: SynonymFamily = {
        id: family.id || Date.now().toString(),
        name: family.name,
        theme: family.theme,
        difficulty: family.difficulty || "intermediate",
        words: family.words || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      data.families.push(newFamily);
      await writeData(data);

      return NextResponse.json({
        success: true,
        family: newFamily,
        message: "Family created successfully",
      });
    } else if (action === "addWord") {
      const familyIndex = data.families.findIndex((f) => f.id === familyId);

      if (familyIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Family not found" },
          { status: 404 },
        );
      }

      const newWord = {
        ...word,
        id: word.id || `${word.word}-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      data.families[familyIndex].words.push(newWord);
      // data.families[familyIndex].updatedAt = new Date().toISOString();
      await writeData(data);

      return NextResponse.json({
        success: true,
        word: newWord,
        message: "Word added successfully",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 },
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: "Operation failed" },
      { status: 500 },
    );
  }
}

// export async function PATCH(request: Request) {
//   try {
//     const body = await request.json();

//     const { familyId, word } = body;

//     const data = await readData();

//     data.families = data.families.map((family: any) => {
//       if (family.id === familyId) {
//         return {
//           ...family,
//           words: [...family.words, word],
//         };
//       }

//       return family;
//     });

//     await writeData(data);

//     return NextResponse.json({
//       success: true,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update vocabulary" },
//       { status: 500 },
//     );
//   }
// }

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { familyId, word } = body;

    const data = await readData();

    data.families = data.families.map((family: any) => {
      if (family.id === familyId) {
        return {
          ...family,
          words: family.words.map((w: any) =>
            w.id === word.id
              ? {
                  ...w,
                  ...word,
                }
              : w,
          ),
        };
      }

      return family;
    });

    await writeData(data);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to update vocabulary" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { familyId, wordId } = body;

    const data = await readData();

    data.families = data.families.map((family: any) => {
      if (family.id === familyId) {
        return {
          ...family,
          words: family.words.filter((w: any) => w.id !== wordId),
        };
      }

      return family;
    });

    await writeData(data);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete word" },
      { status: 500 },
    );
  }
}
