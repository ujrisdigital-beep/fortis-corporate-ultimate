import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FortisLogo from './FortisLogo';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';

export default function Header({ isAdmin = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const adminNavItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Media', href: '/admin/media' },
    { label: 'Contacts', href: '/admin/contacts' },
    { label: 'Blog', href: '/admin/blog' },
  ];

  const items = isAdmin ? adminNavItems : navItems;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <Link href={isAdmin ? '/admin' : '/'}>
            <a className="flex items-center gap-3 group">
              <FortisLogo size="md" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition">
                  FORTIS INVICTA
                </h1>
                <p className="text-xs text-gray-500">Regenerative Infrastructure</p>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {items.map(item => (
              <Link key={item.href} href={item.href}>
                <a className={`text-sm font-medium transition ${
                  router.pathname === item.href
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 text-sm font-medium transition"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4">
            {items.map(item => (
              <Link key={item.href} href={item.href}>
                <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  {item.label}
                </a>
              </Link>
            ))}
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 rounded"
              >
                Logout
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}