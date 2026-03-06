import { NextResponse } from "next/server";
import { getFeaturedProducts } from "@/lib/data";

export async function GET() {
  try {
    const products = getFeaturedProducts(12);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products" },
      { status: 500 },
    );
  }
}
