import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// ✅ GET — Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('GET /users error:', error);
    return NextResponse.json(
      { error: 'Nie udało się pobrać listy użytkowników.' },
      { status: 500 }
    );
  }
}

// ✅ POST — Create new user
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const user = await prisma.user.create({
      data,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('POST /users error:', error);
    return NextResponse.json({ error: 'Nie udało się utworzyć użytkownika.' }, { status: 500 });
  }
}
