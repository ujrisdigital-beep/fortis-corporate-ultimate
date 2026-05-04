import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>FORTIS INVICTA LTD - Powering The Gambia's Future</title>
        <meta name="description" content="FORTIS INVICTA LTD delivers transformative infrastructure, renewable energy, and circular economy solutions for The Gambia." />
        <link rel="icon" href="/fortis-3d-logo.jpeg" />
      </Head>

      <header className="bg-navy text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">FORTIS INVICTA</div>
            <div className="space-x-4 sm:space-x-6 flex flex-wrap gap-2 sm:gap-0">
               <Link href="/" className="text-gold">Home</Link>
               <Link href="/about" className="hover:text-gold">About</Link>
               <Link href="/projects" className="hover:text-gold">Projects</Link>
               <Link href="/gallery" className="hover:text-gold">Gallery</Link>
               <Link href="/blog" className="hover:text-gold">News</Link>
               <Link href="/contact" className="hover:text-gold">Contact</Link>
               <Link href="/admin" className="bg-gold text-navy px-4 py-2 rounded font-semibold text-sm">Admin</Link>
             </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative bg-navy text-white py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h1 className="text-3xl sm:text-5xl font-bold mb-6">Powering The Gambia's Future</h1>
             <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
              FORTIS INVICTA LTD delivers transformative infrastructure, renewable energy, 
              and circular economy solutions that drive sustainable development across The Gambia.
            </p>
             <div className="space-x-4 sm:space-x-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
               <Link href="/projects" className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 inline-block text-center">
                 View Our Projects
               </Link>
               <Link href="/contact" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-navy inline-block text-center">
                 Get In Touch
               </Link>
             </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-navy">Our Core Services</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Renewable Energy', desc: 'Solar installations and clean energy solutions powering communities across The Gambia.', icon: '☀️' },
                { title: 'Infrastructure', desc: 'Road networks, bridges, and critical infrastructure for sustainable development.', icon: '🏗️' },
                { title: 'Water & Sanitation', desc: 'Clean water treatment facilities ensuring access to safe drinking water.', icon: '💧' },
                { title: 'Smart Solutions', desc: 'Innovative technology integration for modern project management.', icon: '📱' }
              ].map((service, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-navy">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8 text-navy">Ready to Develop The Gambia Together?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Partner with FORTIS INVICTA for innovative solutions to your infrastructure and development needs.
            </p>
            <div className="space-x-4">
              <Link href="/contact" className="bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900">
                Start Your Project
              </Link>
              <Link href="https://wa.me/220999999?text=I%20am%20interested%20in%20FORTIS%20INVICTA%20services" className="border-2 border-navy text-navy px-8 py-3 rounded-lg font-semibold hover:bg-navy hover:text-white">
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-navy">Additional Solutions</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Circular Economy Hub', link: '/circular-economy', desc: 'Transform agro-waste into biogas, biochar, and protein.' },
                { title: 'Smart Agriculture', link: '/smart-agriculture', desc: 'Regenerative farming, OMF, cover crops for food security.' },
                { title: 'FORTIS OS', link: 'https://fortisos.cloud', desc: 'National digital infrastructure platform.' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-navy">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <Link href={item.link} className="text-gold hover:underline">
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-gold">Home</Link></li>
                <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
                <li><Link href="/projects" className="hover:text-gold">Our Projects</Link></li>
                <li><Link href="/gallery" className="hover:text-gold">Gallery</Link></li>
                <li><Link href="/blog" className="hover:text-gold">News & Updates</Link></li>
                <li><Link href="/contact" className="hover:text-gold">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li>Renewable Energy</li>
                <li>Road Infrastructure</li>
                <li>Water & Sanitation</li>
                <li>Commercial Construction</li>
                <li>Telecommunications</li>
                <li>Project Management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2">
                <li>Kairaba Avenue, Banjul, The Gambia</li>
                <li><a href="tel:+2209999999">+220 999 9999</a></li>
                <li><a href="mailto:info@fortisinvicta.com">info@fortisinvicta.com</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gold">Facebook</a>
                <a href="#" className="hover:text-gold">Instagram</a>
                <a href="#" className="hover:text-gold">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p>© 2026 FORTIS INVICTA LTD. All rights reserved. | Powering The Gambia's Future</p>
            <a href="https://wa.me/220999999?text=Hello%20FORTIS%20INVICTA%2C%20I%20have%20an%20inquiry" className="mt-4 inline-block">
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
