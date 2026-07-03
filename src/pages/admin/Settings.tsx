import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Settings {
  id: string;
  site_name: string;
  logo_url: string;
  meta_title: string;
  meta_description: string;
  contact_email: string;
  footer_text: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    setSettings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!settings) return;

    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!settings) return;

    await supabase
      .from("site_settings")
      .update(settings)
      .eq("id", settings.id);

    alert("Settings saved successfully!");
  };

  if (loading || !settings) {
    return <div className="p-6">Loading settings...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

        <div className="space-y-4">

          <input
            type="text"
            name="site_name"
            placeholder="Site Name"
            value={settings.site_name || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
          />

          <input
            type="text"
            name="logo_url"
            placeholder="Logo URL"
            value={settings.logo_url || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
          />

          <input
            type="text"
            name="meta_title"
            placeholder="Meta Title"
            value={settings.meta_title || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
          />

          <textarea
            name="meta_description"
            placeholder="Meta Description"
            value={settings.meta_description || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
          />

          <input
            type="email"
            name="contact_email"
            placeholder="Contact Email"
            value={settings.contact_email || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
          />

          <textarea
            name="footer_text"
            placeholder="Footer Text"
            value={settings.footer_text || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
          />

          <button
            onClick={handleSave}
            className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
          >
            Save Settings
          </button>

        </div>
      </div>
    </div>
  );
};

export default Settings;