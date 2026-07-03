import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH CATEGORIES ---------------- */
  const fetchCategories = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setCategories(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------------- CREATE CATEGORY ---------------- */
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategory.trim()) return;

    const slug = newCategory
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");

    const { error } = await supabase.from("categories").insert([
      {
        name: newCategory,
        slug,
      },
    ]);

    if (!error) {
      setNewCategory("");
      fetchCategories();
    } else {
      alert("Category already exists.");
    }
  };

  /* ---------------- DELETE CATEGORY ---------------- */
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    await supabase.from("categories").delete().eq("id", id);

    fetchCategories();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6">Categories</h1>

        {/* Create Category Form */}
        <form onSubmit={handleCreate} className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="New category name"
            className="flex-1 p-3 rounded-lg border
            bg-gray-100 dark:bg-gray-700
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-5 py-3 rounded-lg font-semibold"
          >
            Add
          </button>
        </form>

        {/* Category List */}
        {loading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex justify-between items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <div>
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.slug}</p>
                </div>

                <button
                  onClick={() => handleDelete(cat.id)}
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

export default Categories;