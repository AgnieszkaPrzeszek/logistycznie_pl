'use client';

import { useState } from 'react';
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
import Logo from '@/components/Logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const schema = z.object({
  email: z.string().email('Podaj poprawny adres email'),
});

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [backendMessage, setBackendMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setBackendMessage('');

    const result: any = schema.safeParse({ email });
    if (!result.success) {
      setErrors({ email: result.error.errors[0].message });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      setBackendMessage(data.error || 'Jeśli ten adres istnieje, wysłano link resetujący hasło.');
    } catch {
      setBackendMessage('Błąd serwera. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-semibold">Reset hasła</CardTitle>
          <CardDescription>
            Wpisz swój adres email, aby otrzymać link do zresetowania hasła.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Podaj email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn({ 'border-red-500': errors.email })}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            {backendMessage && (
              <p className="text-sm text-center text-neutral-700">{backendMessage}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-black to-gray-700 text-white hover:opacity-90"
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij link resetujący'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-center space-y-2">
          <Separator />
          <p>
            <Link href="/login" className="text-primary hover:underline underline-offset-2">
              Wróć do logowania
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
