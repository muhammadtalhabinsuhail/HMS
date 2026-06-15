'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  const navLinkStyle = (href, exact = false) => {
    const isActive = exact ? pathname === href : pathname === href;
    return {
      color: isActive ? 'orange' : 'black',
      fontWeight: isActive ? '700' : '400',
    };
  };

  return (
    <header className="shadow sticky top-0 z-50 bg-white">
      <nav className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/hotellogo.png" alt="Logo" width={80} height={48} style={{ height: '3rem', width: 'auto' }} />
          </Link>

          {/* Nav Links */}
          <div className="flex space-x-6 text-lg font-medium">
            <Link href="/" style={navLinkStyle('/', true)}>Home</Link>
            <Link href="/about" style={navLinkStyle('/about')}>About</Link>
            <Link href="/contact" style={navLinkStyle('/contact')}>Contact</Link>
            <Link href="/event" style={navLinkStyle('/event')}>Event &amp; Dining</Link>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <Link href="/login" className="px-4 py-2 text-sm border rounded">
              Log in
            </Link>
            <Link href="/signup" className="px-4 py-2 text-sm bg-orange-600 text-white rounded">
              Sign up
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}
