import { NextRequest, NextResponse } from "next/server";
import { getPaginatedProducts } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const category = searchParams.get("category") || undefined;

    const result = getPaginatedProducts(
      isNaN(page) || page < 1 ? 1 : page,
      isNaN(limit) || limit < 1 ? 20 : limit,
      category,
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
