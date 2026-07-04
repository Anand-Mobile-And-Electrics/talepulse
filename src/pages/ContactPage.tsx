import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    department: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span>Contact</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white font-['Manrope']">
            Contact TalePulse
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Have feedback, partnership inquiries, or story tips? Reach out to us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info */}
          <div className="space-y-5">

            {/* Email */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Mail size={18} className="text-[#1E3A8A] dark:text-blue-400" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">
                  Email
                </span>
              </div>
              <p className="text-sm text-[#1E3A8A] dark:text-blue-400 font-medium">
                aks0317electronics@gmail.com
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                General inquiries and support
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Phone size={18} className="text-[#1E3A8A] dark:text-blue-400" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">
                  Phone
                </span>
              </div>
              <p className="text-sm text-[#1E3A8A] dark:text-blue-400 font-medium">
                +91 80000 00000
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Mon–Sat, 10am–6pm IST
              </p>
            </div>

            {/* Location */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-[#1E3A8A] dark:text-blue-400" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">
                  Location
                </span>
              </div>
              <p className="text-sm text-[#1E3A8A] dark:text-blue-400 font-medium">
                India
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Serving readers worldwide
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8">

            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle size={60} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-['Manrope']">
                  Message Sent!
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
                  Thank you for contacting us. We'll respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#1E3A8A] dark:text-blue-400 font-semibold hover:underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <h2 className="text-xl font-bold text-gray-900 dark:text-white font-['Manrope']">
                  Send us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />

                </div>

                <input
                  type="text"
                  required
                  placeholder="Subject"
                  value={form.subject}
                  onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />

                <textarea
                  rows={6}
                  required
                  placeholder="Your Message"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Send size={16} /> Send Message
                </button>

              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};