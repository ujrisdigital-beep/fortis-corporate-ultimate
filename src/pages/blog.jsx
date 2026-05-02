import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'FORTIS INVICTA Completes 500kW Solar Installation in Serrekunda',
    date: '2026-04-15',
    excerpt: 'The largest solar installation in the Greater Banjul Area is now powering 200+ homes and businesses with clean, renewable energy.',
    category: 'Renewable Energy'
  },
  {
    title: 'Banjul-Brikama Road Rehabilitation Project Reaches 60% Completion',
    date: '2026-03-28',
    excerpt: 'The 15km road rehabilitation project is transforming connectivity between major urban centers, with completion expected by Q3 2026.',
    category: 'Infrastructure'
  },
  {
    title: 'Kanifing Water Treatment Plant Now Serving 50,000 Residents',
    date: '2026-03-10',
    excerpt: 'The modern water treatment facility is delivering clean, safe drinking water to communities across the Kanifing Municipality.',
    category: 'Water & Sanitation'
  },
  {
    title: 'FORTIS INVICTA Announces Smart City Initiative for Kololi District',
    date: '2026-02-20',
    excerpt: 'IoT-enabled street lighting and traffic management system will transform Kololi into The Gambia\'s first smart district.',
    category: 'Smart Solutions'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>News & Updates - FORTIS INVICTA LTD</title>
      </Head>

      <header className="bg-navy text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">FORTIS INVICTA</div>
            <div className="space-x-6">
              <Link href="/" className="hover:text-gold">Home</Link>
              <Link href="/about" className="hover:text-gold">About</Link>
              <Link href="/projects" className="hover:text-gold">Projects</Link>
              <Link href="/gallery" className="hover:text-gold">Gallery</Link>
              <Link href="/blog" className="text-gold">News</Link>
              <Link href="/contact" className="hover:text-gold">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-navy mb-4 text-center">News & Updates</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Latest stories and insights from FORTIS INVICTA
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-navy to-blue-900 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">{post.category}</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString('en-GB')} | {post.category}</div>
                <h3 className="text-xl font-semibold text-navy mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-gold hover:underline font-medium">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
