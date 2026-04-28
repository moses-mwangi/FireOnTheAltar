// app/api/vocabulary/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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

    // Path to your JSON file
    const jsonPath = path.join(
      process.cwd(),
      "lib",
      "data",
      "english",
      "vocab.json",
    );

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

// Optional: GET endpoint to read the file
export async function GET() {
  try {
    const jsonPath = path.join(
      process.cwd(),
      "lib",
      "data",
      "english",
      "vocab.json",
    );
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
