// app/api/vocabulary/common/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const jsonPath = path.join(
  process.cwd(),
  "lib",
  "data",
  "english",
  "confusingWord.json",
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { word } = body;

    if (!word) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 },
      );
    }

    const dir = path.dirname(jsonPath);
    await fs.mkdir(dir, { recursive: true });

    // read existing words
    let existingWords = [];

    try {
      const file = await fs.readFile(jsonPath, "utf-8");
      const parsed = JSON.parse(file);
      existingWords = parsed.words || [];
    } catch {
      existingWords = [];
    }

    // append new word
    const updatedWords = [...existingWords, word];

    await fs.writeFile(
      jsonPath,
      JSON.stringify({ words: updatedWords }, null, 2),
      "utf-8",
    );

    return NextResponse.json({
      success: true,
      words: updatedWords,
    });
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
      words: updatedWords,
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
      words: filteredWords,
    });
  } catch (error) {
    console.error("Error deleting vocabulary:", error);

    return NextResponse.json(
      { error: "Failed to delete vocabulary data" },
      { status: 500 },
    );
  }
}
