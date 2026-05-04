import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const resources = {
  'nawec': {
    title: 'NAWEC - National Water and Electricity Company',
    description: 'Comprehensive overview of NAWEC operations, challenges, and FORTIS INVICTA partnership opportunities.',
    content: 'NAWEC is The Gambia\'s primary utility company responsible for water and electricity distribution...',
    category: 'Infrastructure',
    lastUpdated: '2026-05-04'
  }
};

export default function ResourcePage() {
  const router = useRouter();
  const { slug } = router.query;
  const resource = slug ? resources[slug] : null;

  if (!resource) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Head>
          <title>Resource Not Found - FORTIS INVICTA LTD</title>
        </Head>
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-navy mb-4">Resource Not Found</h1>
          <p className="text-gray-600 mb-8">The resource you're looking for doesn't exist.</p>
          <Link href="/" className="bg-navy text-white px-6 py-3 rounded-lg hover:bg-blue-900">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{resource.title} - FORTIS INVICTA LTD</title>
        <meta name="description" content={resource.description} />
      </Head>

      <header className="bg-navy text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="text-2xl font-bold">FORTIS INVICTA</div>
            <div className="space-x-4 sm:space-x-6 flex flex-wrap gap-2 sm:gap-0">
              <Link href="/" className="hover:text-gold">Home</Link>
              <Link href="/about" className="hover:text-gold">About</Link>
              <Link href="/projects" className="hover:text-gold">Projects</Link>
              <Link href="/contact" className="hover:text-gold">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/resources" className="text-gold hover:underline text-sm">
            ← Back to Resources
          </Link>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
          <div className="text-sm text-gray-500 mb-2">{resource.category}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">{resource.title}</h1>
          <p className="text-gray-600 mb-6">{resource.description}</p>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{resource.content}</p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">Last updated: {resource.lastUpdated}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
