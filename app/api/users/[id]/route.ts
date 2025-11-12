import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// ✅ GET — Fetch user by ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id }: { id: any } = params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: `Nie znaleziono użytkownika o ID ${id}.` },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('GET /users/[id] error:', error);
    return NextResponse.json(
      { error: 'Nie udało się pobrać danych użytkownika.' },
      { status: 500 }
    );
  }
}

// ✅ PUT — Update user by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id }: { id: any } = params;
    const data = await req.json();

    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('PUT /users/[id] error:', error);
    return NextResponse.json(
      { error: 'Nie udało się zaktualizować użytkownika.' },
      { status: 500 }
    );
  }
}

// ✅ DELETE — Delete user by ID
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id }: { id: any } = params;

    const deleted = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error('DELETE /users/[id] error:', error);
    return NextResponse.json({ error: 'Nie udało się usunąć użytkownika.' }, { status: 500 });
  }
}
