import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
}

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  /* -------- FETCH AUTHORS -------- */
  const fetchAuthors = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("authors")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setAuthors(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  /* -------- CREATE AUTHOR -------- */
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAuthor.trim()) return;

    const slug = newAuthor
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");

    const { error } = await supabase.from("authors").insert([
      {
        name: newAuthor,
        slug,
        bio,
      },
    ]);

    if (!error) {
      setNewAuthor("");
      setBio("");
      fetchAuthors();
    } else {
      alert("Author already exists.");
    }
  };

  /* -------- DELETE AUTHOR -------- */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this author?")) return;

    await supabase.from("authors").delete().eq("id", id);
    fetchAuthors();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6">Authors</h1>

        {/* Create Author Form */}
        <form onSubmit={handleCreate} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Author name"
            className="w-full p-3 rounded-lg border
            bg-gray-100 dark:bg-gray-700
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />

          <textarea
            placeholder="Short bio (optional)"
            className="w-full p-3 rounded-lg border
            bg-gray-100 dark:bg-gray-700
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Add Author
          </button>
        </form>

        {/* Author List */}
        {loading ? (
          <p className="text-gray-500">Loading authors...</p>
        ) : authors.length === 0 ? (
          <p className="text-gray-500">No authors found.</p>
        ) : (
          <div className="space-y-4">
            {authors.map((author) => (
              <div
                key={author.id}
                className="flex justify-between items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <div>
                  <p className="font-semibold">{author.name}</p>
                  {author.bio && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {author.bio}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(author.id)}
                  className="text-red-600 dark:text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Authors;