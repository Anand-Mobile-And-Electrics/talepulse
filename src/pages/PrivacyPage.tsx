import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white font-['Manrope'] mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">{title}</h2>
    <div className="text-gray-600 dark:text-gray-400 space-y-3 text-sm leading-relaxed">{children}</div>
  </section>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-8">
      <Link to="/" className="hover:text-[#1E3A8A] dark:hover:text-blue-400">Home</Link>
      <ChevronRight size={12} />
      <span>Privacy Policy</span>
    </nav>

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white font-['Manrope'] mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: November 20, 2024</p>

      <Section title="1. Introduction">
        <p>TalePulse ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at talepulse.com.</p>
        <p>By accessing or using our service, you agree to the collection and use of information in accordance with this policy.</p>
      </Section>

      <Section title="2. Information We Collect">
        <p><strong className="text-gray-700 dark:text-gray-300">Personal Information:</strong> We may collect name, email address, and other contact information when you subscribe to our newsletter or contact us.</p>
        <p><strong className="text-gray-700 dark:text-gray-300">Usage Data:</strong> We automatically collect information about how you interact with our website, including IP address, browser type, pages visited, time spent, and referring URLs.</p>
        <p><strong className="text-gray-700 dark:text-gray-300">Cookies:</strong> We use cookies and similar tracking technologies to track activity and hold certain information to improve your experience.</p>
      </Section>

      <Section title="3. How We Use Your Information">
        <p>We use the collected information to:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Provide, operate, and maintain our website</li>
          <li>Send you newsletters and updates you subscribed to</li>
          <li>Analyze and improve our content and services</li>
          <li>Respond to your comments and questions</li>
          <li>Monitor usage patterns and detect technical issues</li>
          <li>Comply with legal obligations</li>
        </ul>
      </Section>

      <Section title="4. Advertising (Google AdSense)">
        <p>We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-[#1E3A8A] dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Google's Ad Settings</a>.</p>
      </Section>

      <Section title="5. Data Security">
        <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
      </Section>

      <Section title="6. Third-Party Services">
        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
      </Section>

      <Section title="7. Your Rights (GDPR)">
        <p>If you are located in the European Economic Area, you have the right to access, update, or delete your personal information, object to processing, and request data portability. Contact us at privacy@talepulse.com to exercise these rights.</p>
      </Section>

      <Section title="8. Contact Us">
        <p>If you have questions about this Privacy Policy, please contact us at:</p>
        <p><strong className="text-gray-700 dark:text-gray-300">Email:</strong> privacy@talepulse.com</p>
        <p><strong className="text-gray-700 dark:text-gray-300">Address:</strong> TalePulse Media, 100 Media Drive, New York, NY 10001, USA</p>
      </Section>
    </div>
  </div>
);
