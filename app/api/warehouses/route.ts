import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// ✅ GET — Fetch all warehouses
export async function GET() {
  try {
    const warehouses = await prisma.warehouse.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(warehouses, { status: 200 });
  } catch (error) {
    console.error('GET /warehouses error:', error);
    return NextResponse.json({ error: 'Nie udało się pobrać listy magazynów.' }, { status: 500 });
  }
}

// ✅ POST — Create a new warehouse
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const warehouse = await prisma.warehouse.create({
      data,
    });

    return NextResponse.json(warehouse, { status: 201 });
  } catch (error) {
    console.error('POST /warehouses error:', error);
    return NextResponse.json({ error: 'Nie udało się utworzyć magazynu.' }, { status: 500 });
  }
}
