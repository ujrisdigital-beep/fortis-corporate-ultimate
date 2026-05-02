import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const galleryItems = [
  { title: 'Solar Installation', category: 'Energy', image: '/images/solar.jpg' },
  { title: 'Road Construction', category: 'Infrastructure', image: '/images/road.jpg' },
  { title: 'Water Treatment', category: 'Water & Sanitation', image: '/images/water.jpg' },
  { title: 'Bridge Project', category: 'Infrastructure', image: '/images/bridge.jpg' },
  { title: 'Smart Lighting', category: 'Smart Solutions', image: '/images/smart.jpg' },
  { title: 'Community Outreach', category: 'CSR', image: '/images/community.jpg' },
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
            <div className="space-x-6">
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
        <h1 className="text-4xl font-bold text-navy mb-4 text-center">Project Gallery</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Visual showcase of our transformative projects across The Gambia
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <div key={i} className="relative group overflow-hidden rounded-lg">
              <div className="h-64 bg-gradient-to-br from-navy to-blue-800 flex items-center justify-center">
                <span className="text-white text-lg">{item.title}</span>
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
