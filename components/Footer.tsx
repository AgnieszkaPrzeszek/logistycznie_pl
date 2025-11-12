import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Facebook, Instagram, Mail } from 'lucide-react';
import Logo from '@/components/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-linear-to-b from-white to-gray-50 border-t border-gray-200 mt-10">
      <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {' '}
            <Logo />
          </h3>
          <p className="text-sm text-muted-foreground">© {currentYear} All rights reserved.</p>
        </div>

        {/* Center links */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Regulamin
          </Link>
          <Separator orientation="vertical" className="hidden md:block h-4 bg-gray-300" />
          <Link
            href="/privacy-policy"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Polityka prywatności
          </Link>
          <Separator orientation="vertical" className="hidden md:block h-4 bg-gray-300" />
          <Link
            href="/cookie-policy"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Polityka plików cookie
          </Link>
        </div>

        {/* Right side (socials) */}
        <div className="flex items-center justify-center space-x-4">
          <Link
            href="https://facebook.com"
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          >
            <Facebook size={18} className="text-gray-700" />
          </Link>
          <Link
            href="https://instagram.com"
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          >
            <Instagram size={18} className="text-gray-700" />
          </Link>
          <Link
            href="https://linkedin.com"
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          >
            <Linkedin size={18} className="text-gray-700" />
          </Link>
          <Link
            href="mailto:info@warehousefinder.com"
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          >
            <Mail size={18} className="text-gray-700" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
