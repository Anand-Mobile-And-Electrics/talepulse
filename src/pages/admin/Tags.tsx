import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(true);

  /* -------- FETCH TAGS -------- */
  const fetchTags = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("tags")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTags(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  /* -------- CREATE TAG -------- */
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTag.trim()) return;

    const slug = newTag
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");

    const { error } = await supabase.from("tags").insert([
      {
        name: newTag,
        slug,
      },
    ]);

    if (!error) {
      setNewTag("");
      fetchTags();
    } else {
      alert("Tag already exists.");
    }
  };

  /* -------- DELETE TAG -------- */
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this tag?"
    );
    if (!confirmDelete) return;

    await supabase.from("tags").delete().eq("id", id);

    fetchTags();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6">Tags</h1>

        {/* Create Form */}
        <form onSubmit={handleCreate} className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="New tag name"
            className="flex-1 p-3 rounded-lg border
            bg-gray-100 dark:bg-gray-700
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-5 py-3 rounded-lg font-semibold"
          >
            Add
          </button>
        </form>

        {/* Tag List */}
        {loading ? (
          <p className="text-gray-500">Loading tags...</p>
        ) : tags.length === 0 ? (
          <p className="text-gray-500">No tags found.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <span>{tag.name}</span>

                <button
                  onClick={() => handleDelete(tag.id)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tags;