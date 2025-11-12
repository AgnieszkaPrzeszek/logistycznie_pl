import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Nieprawidłowy email lub hasło.' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Nieprawidłowy email lub hasło.' }, { status: 401 });
    }

    // TODO: Create and set a session token or JWT cookie here
    // Example: set a NextAuth session or your own cookie
    // For demo, just return user data
    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Błąd serwera.' }, { status: 500 });
  }
}
