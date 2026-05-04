import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { validateEmailAsPrimary } from '../lib/fortisSecurity';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Submitting...' });

    const emailValidation = await validateEmailAsPrimary(formData.email);
    if (!emailValidation.valid) {
      setStatus({ type: 'error', message: emailValidation.reason });
      return;
    }

    const { error } = await supabase.from('contact_inquiries').insert({
      ...formData,
      status: 'pending',
      created_at: new Date().toISOString()
    });

    if (error) {
      setStatus({ type: 'error', message: 'Submission failed. Please try again.' });
    } else {
      setStatus({ type: 'success', message: 'Inquiry submitted successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Contact Us - FORTIS INVICTA LTD</title>
      </Head>

      <header className="bg-navy text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="text-2xl font-bold">FORTIS INVICTA</div>
            <div className="space-x-4 sm:space-x-6 flex flex-wrap gap-2 sm:gap-0">
              <Link href="/" className="hover:text-gold">Home</Link>
              <Link href="/about" className="hover:text-gold">About</Link>
              <Link href="/services" className="hover:text-gold">Services</Link>
              <Link href="/contact" className="text-gold">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">Contact Us</h1>
        
        {status.message && (
          <div className={`p-4 rounded mb-6 ${
            status.type === 'success' ? 'bg-green-100 text-green-800' :
            status.type === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {status.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email (Primary ID)</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
              placeholder="Business email only (no temp emails)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-navy text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
          >
            Submit Inquiry
          </button>
        </form>
      </main>
    </div>
  );
}
