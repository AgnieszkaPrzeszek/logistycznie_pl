import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // SELECT * FROM users WHERE email = 'emasd'
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}
