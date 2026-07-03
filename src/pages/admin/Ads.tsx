import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link: string;
  placement: string;
  active: boolean;
}

const Ads: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    image_url: "",
    link: "",
    placement: "sidebar",
  });

  const fetchAds = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("ads")
      .select("*")
      .order("created_at", { ascending: false });

    setAds(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    await supabase.from("ads").insert([
      { ...form }
    ]);

    setForm({
      title: "",
      image_url: "",
      link: "",
      placement: "sidebar",
    });

    fetchAds();
  };

  const toggleActive = async (id: string, status: boolean) => {
    await supabase
      .from("ads")
      .update({ active: !status })
      .eq("id", id);

    fetchAds();
  };

  const deleteAd = async (id: string) => {
    if (!window.confirm("Delete this ad?")) return;

    await supabase.from("ads").delete().eq("id", id);
    fetchAds();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6">Advertisements</h1>

        {/* Create Ad Form */}
        <form onSubmit={handleCreate} className="grid gap-4 mb-8">

          <input
            type="text"
            placeholder="Ad Title"
            className="p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            className="p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
            value={form.image_url}
            onChange={(e) =>
              setForm({ ...form, image_url: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Redirect Link"
            className="p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
            value={form.link}
            onChange={(e) =>
              setForm({ ...form, link: e.target.value })
            }
          />

          <select
            className="p-3 rounded-lg border bg-gray-100 dark:bg-gray-700"
            value={form.placement}
            onChange={(e) =>
              setForm({ ...form, placement: e.target.value })
            }
          >
            <option value="top-banner">Top Banner</option>
            <option value="sidebar">Sidebar</option>
            <option value="in-article">In Article</option>
            <option value="footer">Footer</option>
          </select>

          <button
            type="submit"
            className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
          >
            Add Advertisement
          </button>

        </form>

        {/* Ad List */}
        {loading ? (
          <p>Loading ads...</p>
        ) : ads.length === 0 ? (
          <p>No ads created.</p>
        ) : (
          <div className="space-y-4">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{ad.title}</p>
                  <p className="text-sm text-gray-500">
                    Placement: {ad.placement}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      toggleActive(ad.id, ad.active)
                    }
                    className={`px-3 py-1 rounded ${
                      ad.active
                        ? "bg-green-600 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {ad.active ? "Active" : "Inactive"}
                  </button>

                  <button
                    onClick={() => deleteAd(ad.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Ads;