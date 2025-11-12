import Link from 'next/link';
import NavItems from './NavItems';
import { buttonVariants } from './ui/button';
import MobileNav from './MobileNav';
import Logo from '@/components/Logo';
// import { getSession } from '@/lib/getSession';
//import { signOut } from '@/auth';

const Navbar = async () => {
  // const session: any = await getSession();
  // const user = session?.user;
  const session: any = false;
  const user: any = false;

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex flex-col w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🔹 Top row: Logo + Mobile Nav */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* 🔹 Right side (auth buttons / user links) */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/login" className={buttonVariants({ variant: 'ghost' })}>
                  Logowanie
                </Link>
                <Link href="/register" className={buttonVariants({ variant: 'ghost' })}>
                  Rejestracja
                </Link>
              </>
            ) : (
              <>
                {user?.role === 'admin' && (
                  <Link href="/admin" className={buttonVariants({ variant: 'ghost' })}>
                    Admin
                  </Link>
                )}
                <Link href="/warehouses/add" className={buttonVariants({ variant: 'ghost' })}>
                  Dodaj ogłoszenie
                </Link>
                <form
                  action={async () => {
                    'use server';
                    // await signOut();
                  }}
                >
                  <button type="submit" className={buttonVariants({ variant: 'ghost' })}>
                    Wyloguj się
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* 🔹 Second row: Navigation items */}
        <div className=" hidden md:flex items-center justify-center h-12 border-t border-gray-100">
          <NavItems />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
