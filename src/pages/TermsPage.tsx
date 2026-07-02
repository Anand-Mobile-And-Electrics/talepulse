import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white font-['Manrope'] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">{title}</h2>
    <div className="text-gray-600 dark:text-gray-400 space-y-3 text-sm leading-relaxed">{children}</div>
  </section>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-8">
      <Link to="/" className="hover:text-[#1E3A8A] dark:hover:text-blue-400">Home</Link>
      <ChevronRight size={12} />
      <span>Terms of Service</span>
    </nav>

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope'] mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: November 20, 2024</p>

      <Section title="1. Acceptance of Terms">
        <p>By accessing and using TalePulse (talepulse.com), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.</p>
      </Section>

      <Section title="2. Use of Content">
        <p>All content published on TalePulse, including articles, stories, images, and multimedia, is protected by copyright law. You may share links to our content but may not reproduce, distribute, or republish our content without written permission.</p>
        <p>Limited quotation for journalistic or educational purposes is permitted with proper attribution to TalePulse.</p>
      </Section>

      <Section title="3. User Conduct">
        <p>When using our comment system or contact forms, you agree not to:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Post false, misleading, or defamatory content</li>
          <li>Harass, threaten, or abuse other users or staff</li>
          <li>Spam or engage in commercial solicitation</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Attempt to hack or disrupt our systems</li>
        </ul>
      </Section>

      <Section title="4. Comments and User Submissions">
        <p>By posting comments, you grant TalePulse a non-exclusive, royalty-free license to use, reproduce, and display your submission. Comments are moderated and may be removed at our discretion.</p>
      </Section>

      <Section title="5. Disclaimer of Warranties">
        <p>TalePulse provides content "as is" without warranties of any kind. While we strive for accuracy, we do not guarantee that all information is complete, accurate, or up-to-date. Always verify critical information from official sources.</p>
      </Section>

      <Section title="6. Limitation of Liability">
        <p>TalePulse and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or content.</p>
      </Section>

      <Section title="7. Changes to Terms">
        <p>We reserve the right to modify these terms at any time. Continued use of TalePulse after changes constitutes acceptance of the new terms.</p>
      </Section>

      <Section title="8. Contact">
        <p>Questions about these Terms? Email: legal@talepulse.com</p>
      </Section>
    </div>
  </div>
);
