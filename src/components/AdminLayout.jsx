import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from './Header';
import { FiMenu, FiX, FiHome, FiImage, FiFileText, FiMail, FiSettings, FiBarChart3 } from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: FiBarChart3 },
    { label: 'Projects', href: '/admin/projects', icon: FiHome },
    { label: 'Media', href: '/admin/media', icon: FiImage },
    { label: 'Blog', href: '/admin/blog', icon: FiFileText },
    { label: 'Contacts', href: '/admin/contacts', icon: FiMail },
    { label: 'Settings', href: '/admin/settings', icon: FiSettings },
  ];

  return (
    <>
      <Header isAdmin={true} />
      <div className="flex h-screen bg-gray-100 pt-16">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col fixed h-screen pt-16 overflow-y-auto`}>
          <div className="p-4 flex items-center justify-end">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a className={`flex items-center gap-4 px-4 py-3 transition ${
                    isActive ? 'bg-green-600 border-l-4 border-green-400' : 'hover:bg-gray-800'
                  }`}>
                    <Icon size={20} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </a>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`${
          sidebarOpen ? 'ml-64' : 'ml-20'
        } flex-1 overflow-auto transition-all duration-300`}>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}