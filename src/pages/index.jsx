import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>FORTIS INVICTA LTD - Corporate Excellence</title>
        <meta name="description" content="FORTIS INVICTA LTD - Corporate website with military-grade security" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-navy text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">FORTIS INVICTA</div>
            <div className="space-x-6">
              <Link href="/about" className="hover:text-gold">About</Link>
              <Link href="/services" className="hover:text-gold">Services</Link>
              <Link href="/projects" className="hover:text-gold">Projects</Link>
              <Link href="/contact" className="hover:text-gold">Contact</Link>
              <Link href="/admin" className="bg-gold text-navy px-4 py-2 rounded">Admin</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Corporate Excellence with Military-Grade Security</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              FORTIS INVICTA LTD delivers premium corporate services with AES-256 encryption, 
              TLS 1.3 enforcement, and intelligent automation.
            </p>
            <div className="space-x-4">
              <Link href="/contact" className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400">
                Get Started
              </Link>
              <Link href="/services" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-navy">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-navy">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Corporate Intelligence', desc: 'Advanced market research and competitive analysis' },
                { title: 'Legal Compliance', desc: 'Comprehensive legal research and compliance monitoring' },
                { title: 'Financial Analysis', desc: 'In-depth financial modeling and risk assessment' }
              ].map((service, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-navy">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8 text-navy">Security Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'AES-256 Encryption',
                'TLS 1.3 Enforcement',
                '3-Level Alarm System',
                'Self-Improvement Loop'
              ].map((feature, i) => (
                <div key={i} className="p-4 border-2 border-gold rounded-lg">
                  <p className="font-semibold text-navy">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 FORTIS INVICTA LTD. All rights reserved. | fortisinvicta.com</p>
        </div>
      </footer>
    </div>
  );
}
