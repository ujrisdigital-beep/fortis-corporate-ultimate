import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const galleryItems = [
  { title: 'Solar Installation', category: 'Energy', bg: 'from-yellow-600 to-orange-800' },
  { title: 'Road Construction', category: 'Infrastructure', bg: 'from-gray-600 to-gray-800' },
  { title: 'Water Treatment', category: 'Water & Sanitation', bg: 'from-blue-600 to-blue-800' },
  { title: 'Bridge Project', category: 'Infrastructure', bg: 'from-gray-700 to-gray-900' },
  { title: 'Smart Lighting', category: 'Smart Solutions', bg: 'from-purple-600 to-purple-800' },
  { title: 'Community Outreach', category: 'CSR', bg: 'from-green-600 to-green-800' },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Gallery - FORTIS INVICTA LTD</title>
      </Head>

      <header className="bg-navy text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">FORTIS INVICTA</div>
            <div className="space-x-4 sm:space-x-6 flex flex-wrap gap-2 sm:gap-0">
              <Link href="/" className="hover:text-gold">Home</Link>
              <Link href="/about" className="hover:text-gold">About</Link>
              <Link href="/projects" className="hover:text-gold">Projects</Link>
              <Link href="/gallery" className="text-gold">Gallery</Link>
              <Link href="/contact" className="hover:text-gold">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 text-center">Project Gallery</h1>
        <p className="text-lg sm:text-xl text-gray-600 text-center mb-8 sm:mb-12">
          Visual showcase of our transformative projects across The Gambia
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
              <div key={i} className="relative group overflow-hidden rounded-lg">
                <div className={`h-48 sm:h-64 bg-gradient-to-br ${item.bg} flex items-center justify-center`}>
                  <span className="text-white text-lg font-semibold">{item.title}</span>
                </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
