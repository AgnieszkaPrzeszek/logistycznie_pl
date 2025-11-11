import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // SELECT * FROM users WHERE email = 'emasd'
  const warehouses = await prisma.warehouse.findMany();

  return NextResponse.json(warehouses);
}
