'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/prisma/prisma-client';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import Link from 'next/link';

// ✅ Schema validation (Zod)
const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email jest wymagany' }).email('Niepoprawny format email'),
  password: z.string().min(1, { message: 'Hasło jest wymagane' }),
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset
    setErrors({});
    setBackendError(null);

    const result: any = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err: any) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ Direct check on back‑end (PostgreSQL) via an API route
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setBackendError(data.error || 'Nieprawidłowy email lub hasło.');
        return;
      }

      // ✅ If login success → redirect
      router.push('/warehouses');
    } catch (err) {
      console.error('Login error:', err);
      setBackendError('Wystąpił błąd połączenia z serwerem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">Zaloguj się</CardTitle>
          <CardDescription>Uzyskaj dostęp do swojego konta i zarządzaj magazynami</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="wprowadź swój email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn({ 'border-red-500 focus-visible:ring-red-500': errors.email })}
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                type="password"
                placeholder="wprowadź hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn({ 'border-red-500 focus-visible:ring-red-500': errors.password })}
              />
              {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
            </div>

            {backendError && <p className="text-sm text-red-600 text-center">{backendError}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-black to-gray-700 text-white hover:opacity-90"
            >
              {isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 text-sm text-center">
          <Separator className="my-1" />
          <p className="text-neutral-600">
            Nie masz konta?{' '}
            <Link href="/register" className="text-primary hover:underline underline-offset-2">
              Utwórz konto
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
