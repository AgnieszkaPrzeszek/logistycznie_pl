import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // SELECT * FROM users WHERE email = 'emasd'
  const coworking = await prisma.coworking.findMany();

  return NextResponse.json(coworking);
}
