import React from 'react';
import Link from 'next/link';
import FortisLogo from './FortisLogo';
import { FiFacebook, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <FortisLogo size="lg" />
            <h3 className="text-lg font-bold mt-4">FORTIS INVICTA LTD</h3>
            <p className="text-gray-400 text-sm mt-2">
              Regenerative infrastructure solutions for sustainable development
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-green-400 transition">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/"><a className="hover:text-white transition">Home</a></Link></li>
              <li><Link href="/about"><a className="hover:text-white transition">About</a></Link></li>
              <li><Link href="/services"><a className="hover:text-white transition">Services</a></Link></li>
              <li><Link href="/projects"><a className="hover:text-white transition">Projects</a></Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Infrastructure Development</a></li>
              <li><a href="#" className="hover:text-white transition">Sustainability Consulting</a></li>
              <li><a href="#" className="hover:text-white transition">Project Management</a></li>
              <li><a href="#" className="hover:text-white transition">Community Engagement</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Banjul, The Gambia</span>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone size={18} className="mt-1 flex-shrink-0" />
                <a href="tel:+220" className="hover:text-white transition">+220 XXXX XXXX</a>
              </li>
              <li className="flex items-start gap-3">
                <FiMail size={18} className="mt-1 flex-shrink-0" />
                <a href="mailto:info@fortisinvicta.com" className="hover:text-white transition">
                  info@fortisinvicta.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2026 FORTIS INVICTA LTD. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}