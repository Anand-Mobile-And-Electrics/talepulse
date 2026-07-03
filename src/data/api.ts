import { supabase } from "@/lib/supabase";

/* ---------------- POSTS ---------------- */

export const getPosts = async () => {
  return await supabase.from("posts").select("*").order("published_at", { ascending: false });
};

export const getFeaturedPosts = async () => {
  return await supabase
    .from("posts")
    .select("*")
    .eq("is_breaking", true)
    .limit(5);
};

export const getTrendingPosts = async () => {
  return await supabase
    .from("posts")
    .select("*")
    .order("views", { ascending: false })
    .limit(10);
};

export const getEditorPicks = async () => {
  return await supabase
    .from("posts")
    .select("*")
    .limit(4);
};

export const getPostsByCategory = async (category: string) => {
  return await supabase
    .from("posts")
    .select("*")
    .eq("category", category)
    .limit(10);
};

/* ---------------- CATEGORIES ---------------- */

export const getCategories = async () => {
  return await supabase.from("categories").select("*");
};

/* ---------------- SEARCH ---------------- */

export const searchPosts = async (query: string) => {
  return await supabase
    .from("posts")
    .select("*")
    .ilike("title", `%${query}%`);
};