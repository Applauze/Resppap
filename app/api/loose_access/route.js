import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request, response) {
  const body = await request.json();
  const Cookies = new cookies();
  Cookies.delete("accessStatus");
  Cookies.delete("username");
  Cookies.delete("Category");
  return NextResponse.json({ message: "Success", success: true });
}
