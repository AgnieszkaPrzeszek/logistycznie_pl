'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PRODUCT_CATEGORIES = [
  {
    label: 'Magazyny',
    href: `/warehouses`,
  },
  {
    label: 'Biura',
    href: `/offices`,
  },
  // {
  //   label: 'Coworking',
  //   href: `/coworking`,
  // },
  // {
  //   label: 'Usługi logistyczne',
  //   href: `/services`,
  // },
  // {
  //   label: 'Praca',
  //   href: `/employment`,
  // },
];

const NavItems = () => {
  const pathname = usePathname(); // This will run only once when the component mounts

  return (
    <div className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category: any, i: any) => {
        return (
          <div className="flex" key={i}>
            <div className="relative flex items-center">
              <Link
                href={category.href}
                className={`gap-1.5 ${pathname === category.href ? 'bg-gray-200 rounded-lg' : ''}`}
              >
                <Button
                  // Apply background color if active
                  variant="ghost"
                >
                  {category.label}
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NavItems;
