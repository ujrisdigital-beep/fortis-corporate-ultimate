import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for getting started with FORTIS OS.',
    features: ['Access to basic resources', 'Community support', 'Monthly newsletter'],
    cta: 'Get Started',
    highlighted: false
  },
  {
    name: 'Professional',
    price: '$49/month',
    description: 'For professionals who need advanced features.',
    features: ['All Basic features', 'Priority support', 'Advanced analytics', 'API access'],
    cta: 'Subscribe Now',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific needs.',
    features: ['All Professional features', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
    cta: 'Contact Sales',
    highlighted: false
  }
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const handleSubscribe = (planName) => {
    setSelectedPlan(planName);
    if (planName === 'Enterprise') {
      window.location.href = '/contact';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Subscription Plans - FORTIS OS</title>
        <meta name="description" content="Choose the right FORTIS OS subscription plan for your needs." />
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the subscription plan that best fits your organization's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white border rounded-lg p-6 sm:p-8 ${
                plan.highlighted
                  ? 'border-gold shadow-lg scale-105'
                  : 'border-gray-200 hover:shadow-lg'
              } transition-shadow`}
            >
              {plan.highlighted && (
                <div className="bg-gold text-navy text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-navy mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-navy mb-4">{plan.price}</div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <span className="text-gold mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-gold text-navy hover:bg-yellow-400'
                    : 'bg-navy text-white hover:bg-blue-900'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {selectedPlan && selectedPlan !== 'Enterprise' && (
          <div className="mt-16 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-6 text-center">Complete Your Subscription</h2>
            <form className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Company name"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-navy py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Confirm Subscription to {selectedPlan}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
