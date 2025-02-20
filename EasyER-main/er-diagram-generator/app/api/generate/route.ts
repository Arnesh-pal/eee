import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt field" }, { status: 400 });
    }

    // Call the Flask backend to generate the ER diagram
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to generate diagram" }, { status: 500 });
    }

    return NextResponse.json({ success: true, diagram: data.diagram });
  } catch (error) {
    console.error("Error generating ER diagram:", error);
    return NextResponse.json({ error: "Failed to generate diagram" }, { status: 500 });
  }
}
