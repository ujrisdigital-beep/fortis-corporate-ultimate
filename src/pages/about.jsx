import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>About Us - FORTIS INVICTA LTD</title>
      </Head>

      <header className="bg-navy text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">FORTIS INVICTA</div>
            <div className="space-x-4 sm:space-x-6 flex flex-wrap gap-2 sm:gap-0">
               <Link href="/" className="hover:text-gold">Home</Link>
               <Link href="/about" className="text-gold">About</Link>
               <Link href="/services" className="hover:text-gold">Services</Link>
               <Link href="/contact" className="hover:text-gold">Contact</Link>
             </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">About FORTIS INVICTA LTD</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-navy mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              FORTIS INVICTA LTD delivers world-class corporate solutions with uncompromising security. 
              We combine military-grade encryption, intelligent automation, and deep industry expertise 
              to empower businesses worldwide.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-navy mb-4">Our Values</h2>
            <ul className="space-y-3 text-gray-700">
              <li>✓ Security First - AES-256 encryption, TLS 1.3 enforcement</li>
              <li>✓ Innovation - Self-improving AI systems</li>
              <li>✓ Excellence - 5 specialized search engines</li>
              <li>✓ Reliability - 3-level alarm monitoring</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-navy mb-6">Security Infrastructure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Encryption', desc: 'AES-256-GCM with authenticated encryption' },
              { title: 'Transport', desc: 'TLS 1.3 minimum for all connections' },
              { title: 'Monitoring', desc: 'Real-time 3-level alarm system' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
