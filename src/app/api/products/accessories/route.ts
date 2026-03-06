import { NextResponse } from "next/server";
import { getAccessoriesProducts } from "@/lib/data";

export async function GET() {
  try {
    const products = getAccessoriesProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch accessories products:", error);
    return NextResponse.json(
      { error: "Failed to fetch accessories products" },
      { status: 500 },
    );
  }
}
