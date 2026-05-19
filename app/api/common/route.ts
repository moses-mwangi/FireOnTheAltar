// app/api/vocabulary/common/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const jsonPath = path.join(
  process.cwd(),
  "lib",
  "data",
  "english",
  "commonVocab.json",
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { words } = body;

    if (!words || !Array.isArray(words)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 },
      );
    }

    // Ensure directory exists
    const dir = path.dirname(jsonPath);
    await fs.mkdir(dir, { recursive: true });

    // Write the updated data
    await fs.writeFile(jsonPath, JSON.stringify({ words }, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving vocabulary:", error);
    return NextResponse.json(
      { error: "Failed to save vocabulary data" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonPath, "utf-8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read vocabulary data" },
      { status: 500 },
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                                   PATCH                                    */
/* -------------------------------------------------------------------------- */

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { id, updatedWord } = body;

    if (!id || !updatedWord) {
      return NextResponse.json(
        { error: "id and updatedWord are required" },
        { status: 400 },
      );
    }

    // Read existing file
    const fileContents = await fs.readFile(jsonPath, "utf-8");

    const data = JSON.parse(fileContents);

    // Update word
    const updatedWords = data.words.map((word: any) =>
      String(word.id) === String(id) ? { ...word, ...updatedWord } : word,
    );

    // Save updated file
    await fs.writeFile(
      jsonPath,
      JSON.stringify({ words: updatedWords }, null, 2),
      "utf-8",
    );

    return NextResponse.json({
      success: true,
      message: "Word updated successfully",
    });
  } catch (error) {
    console.error("Error updating vocabulary:", error);

    return NextResponse.json(
      { error: "Failed to update vocabulary data" },
      { status: 500 },
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Word id is required" },
        { status: 400 },
      );
    }

    // Read existing file
    const fileContents = await fs.readFile(jsonPath, "utf-8");

    const data = JSON.parse(fileContents);

    // Remove word
    const filteredWords = data.words.filter(
      (word: any) => String(word.id) !== String(id),
    );

    // Save updated file
    await fs.writeFile(
      jsonPath,
      JSON.stringify({ words: filteredWords }, null, 2),
      "utf-8",
    );

    return NextResponse.json({
      success: true,
      message: "Word deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting vocabulary:", error);

    return NextResponse.json(
      { error: "Failed to delete vocabulary data" },
      { status: 500 },
    );
  }
}
