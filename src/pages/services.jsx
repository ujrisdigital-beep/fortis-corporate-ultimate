import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: 'Corporate Intelligence',
      desc: 'Advanced market research, competitive analysis, and strategic insights using our specialized search engines.',
      features: ['Market Analysis', 'Competitor Tracking', 'Trend Forecasting']
    },
    {
      title: 'Legal Compliance',
      desc: 'Comprehensive legal research and compliance monitoring across multiple jurisdictions.',
      features: ['Regulatory Monitoring', 'Compliance Audits', 'Legal Research']
    },
    {
      title: 'Financial Analysis',
      desc: 'In-depth financial modeling, risk assessment, and investment analysis.',
      features: ['Financial Modeling', 'Risk Assessment', 'Investment Analysis']
    },
    {
      title: 'Talent Acquisition',
      desc: 'Strategic talent sourcing and acquisition using our intelligent search platforms.',
      features: ['Candidate Sourcing', 'Skills Assessment', 'Cultural Fit Analysis']
    },
    {
      title: 'Market Research',
      desc: 'Comprehensive market research with data from Nielsen, Euromonitor, and more.',
      features: ['Consumer Insights', 'Market Sizing', 'Growth Opportunities']
    },
    {
      title: 'Security Consulting',
      desc: 'Military-grade security implementation with AES-256 and TLS 1.3 enforcement.',
      features: ['Security Audits', 'Encryption Setup', 'Compliance Certification']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Services - FORTIS INVICTA LTD</title>
      </Head>

      <header className="bg-navy text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">FORTIS INVICTA</div>
            <div className="space-x-4 sm:space-x-6 flex flex-wrap gap-2 sm:gap-0">
               <Link href="/" className="hover:text-gold">Home</Link>
               <Link href="/about" className="hover:text-gold">About</Link>
               <Link href="/services" className="text-gold">Services</Link>
               <Link href="/contact" className="hover:text-gold">Contact</Link>
             </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-navy mb-4 text-center">Our Services</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Delivering excellence with military-grade security and intelligent automation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-navy mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-sm text-gray-700">
                    <span className="text-gold mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
