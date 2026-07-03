import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, useParams } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // for edit mode

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

  /* ✅ Fetch Categories */
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

  /* ✅ If editing, fetch post */
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

  /* ✅ Auto generate slug */
  useEffect(() => {
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");

    setForm((prev) => ({ ...prev, slug }));
  }, [form.title]);

  /* ✅ Handle Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (id) {
      // UPDATE
      await supabase.from("posts").update(form).eq("id", id);
    } else {
      // INSERT
      await supabase.from("posts").insert([
        { ...form, created_at: new Date().toISOString() },
      ]);
    }

    setLoading(false);
    navigate("/admin/posts");
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Post" : "Create Post"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Slug"
          className="w-full p-3 border rounded bg-gray-100"
          value={form.slug}
          readOnly
        />

        <textarea
          placeholder="Excerpt"
          className="w-full p-3 border rounded"
          value={form.excerpt}
          onChange={(e) =>
            setForm({ ...form, excerpt: e.target.value })
          }
        />

        <textarea
          placeholder="Content (HTML allowed)"
          className="w-full p-3 border rounded h-40"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-3 border rounded"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Author"
          className="w-full p-3 border rounded"
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
          required
        />

        <select
          className="w-full p-3 border rounded"
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

        <button
          type="submit"
          disabled={loading}
          className="bg-[#1E3A8A] text-white px-6 py-3 rounded font-semibold"
        >
          {loading
            ? "Saving..."
            : id
            ? "Update Post"
            : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;