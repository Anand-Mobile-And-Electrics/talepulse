import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, useParams } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    author: "",
  });

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (!error) setCategories(data || []);
    };

    fetchCategories();
  }, []);

  /* ---------------- FETCH POST IF EDITING ---------------- */
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          image: data.image || "",
          category: data.category || "",
          author: data.author || "",
        });
      }
    };

    fetchPost();
  }, [id]);

  /* ---------------- AUTO SLUG ---------------- */
  useEffect(() => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");

    setForm((prev) => ({ ...prev, slug }));
  }, [form.title]);

  /* ---------------- HANDLE SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (id) {
      await supabase.from("posts").update(form).eq("id", id);
    } else {
      await supabase.from("posts").insert([
        { ...form, created_at: new Date().toISOString() },
      ]);
    }

    setLoading(false);
    navigate("/admin/posts");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Post" : "Create Post"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter post title"
              className="w-full p-3 rounded-lg border
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block mb-2 text-sm font-medium">Slug</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border
              bg-gray-200 dark:bg-gray-600
              text-gray-700 dark:text-gray-300
              border-gray-300 dark:border-gray-600"
              value={form.slug}
              readOnly
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block mb-2 text-sm font-medium">Excerpt</label>
            <textarea
              placeholder="Short description..."
              className="w-full p-3 rounded-lg border
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              value={form.excerpt}
              onChange={(e) =>
                setForm({ ...form, excerpt: e.target.value })
              }
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Content (HTML allowed)
            </label>
            <textarea
              placeholder="Write full article content..."
              className="w-full p-3 rounded-lg border h-40
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 rounded-lg border
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
            />
          </div>

          {/* Author */}
          <div>
            <label className="block mb-2 text-sm font-medium">Author</label>
            <input
              type="text"
              placeholder="Author name"
              className="w-full p-3 rounded-lg border
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Select Category
            </label>
            <select
              className="w-full p-3 rounded-lg border
              bg-gray-100 dark:bg-gray-700
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {loading
              ? "Saving..."
              : id
              ? "Update Post"
              : "Publish Post"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePost;