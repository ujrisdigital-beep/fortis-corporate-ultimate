import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const projects = [
  {
    title: 'Solar Power Installation - Serrekunda',
    category: 'Renewable Energy',
    description: '500kW solar installation powering 200+ homes and businesses in the Serrekunda area.',
    status: 'Completed',
    year: '2025'
  },
  {
    title: 'Banjul-Brikama Road Rehabilitation',
    category: 'Infrastructure',
    description: '15km road rehabilitation project improving connectivity between major urban centers.',
    status: 'Ongoing',
    year: '2026'
  },
  {
    title: 'Kanifing Water Treatment Plant',
    category: 'Water & Sanitation',
    description: 'Modern water treatment facility serving 50,000+ residents with clean drinking water.',
    status: 'Completed',
    year: '2025'
  },
  {
    title: 'Smart City Infrastructure - Kololi',
    category: 'Smart Solutions',
    description: 'IoT-enabled street lighting and traffic management system for Kololi district.',
    status: 'Ongoing',
    year: '2026'
  },
  {
    title: 'Rural Electrification Project',
    category: 'Renewable Energy',
    description: 'Solar micro-grids bringing electricity to 15 remote villages across The Gambia.',
    status: 'Planning',
    year: '2026'
  },
  {
    title: 'Waste Management System - Serekunda',
    category: 'Smart Solutions',
    description: 'Automated waste collection and recycling system for The Gambia\'s largest urban area.',
    status: 'Completed',
    year: '2025'
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Projects - FORTIS INVICTA LTD</title>
      </Head>

      <header className="bg-navy text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">FORTIS INVICTA</div>
            <div className="space-x-4 sm:space-x-6 flex flex-wrap gap-2 sm:gap-0">
              <Link href="/" className="hover:text-gold">Home</Link>
              <Link href="/about" className="hover:text-gold">About</Link>
              <Link href="/projects" className="text-gold">Projects</Link>
              <Link href="/contact" className="hover:text-gold">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4 text-center">Our Projects</h1>
        <p className="text-lg sm:text-xl text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
          Transforming The Gambia through innovative infrastructure and sustainable development
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-navy to-blue-900 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">{project.category}</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-navy">{project.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
