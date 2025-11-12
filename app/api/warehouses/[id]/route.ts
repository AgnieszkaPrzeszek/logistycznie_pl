import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// ✅ GET — Fetch one warehouse by ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id }: { id: any } = params;

    const warehouse = await prisma.warehouse.findUnique({
      where: { id },
    });

    if (!warehouse) {
      return NextResponse.json({ error: `Nie znaleziono magazynu o ID ${id}.` }, { status: 404 });
    }

    return NextResponse.json(warehouse, { status: 200 });
  } catch (error) {
    console.error('GET /warehouses/[id] error:', error);
    return NextResponse.json({ error: 'Nie udało się pobrać danych magazynu.' }, { status: 500 });
  }
}

// ✅ PUT — Update warehouse by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id }: { id: any } = params;
    const data = await req.json();

    const updated = await prisma.warehouse.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('PUT /warehouses/[id] error:', error);
    return NextResponse.json({ error: 'Nie udało się zaktualizować magazynu.' }, { status: 500 });
  }
}

// ✅ DELETE — Delete warehouse by ID
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id }: { id: any } = params;

    const deleted = await prisma.warehouse.delete({
      where: { id },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error('DELETE /warehouses/[id] error:', error);
    return NextResponse.json({ error: 'Nie udało się usunąć magazynu.' }, { status: 500 });
  }
}
