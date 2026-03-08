import { NextRequest, NextResponse } from "next/server";
import { getPaginatedPosts } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const result = getPaginatedPosts(
      isNaN(page) || page < 1 ? 1 : page,
      isNaN(limit) || limit < 1 ? 10 : limit,
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
