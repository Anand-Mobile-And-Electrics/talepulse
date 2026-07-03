import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Analytics: React.FC = () => {
  const [stats, setStats] = useState({
    posts: 0,
    categories: 0,
    comments: 0,
    subscribers: 0,
    latestPost: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);

      const { count: postCount } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true });

      const { count: categoryCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });

      const { count: commentCount } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true });

      const { count: subscriberCount } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true });

      const { data: latestPost } = await supabase
        .from("posts")
        .select("title")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      setStats({
        posts: postCount || 0,
        categories: categoryCount || 0,
        comments: commentCount || 0,
        subscribers: subscriberCount || 0,
        latestPost: latestPost?.title || "No posts yet",
      });

      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 dark:text-gray-400">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-8">Analytics Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Total Posts</h2>
            <p className="text-3xl font-bold">{stats.posts}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Categories</h2>
            <p className="text-3xl font-bold">{stats.categories}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Comments</h2>
            <p className="text-3xl font-bold">{stats.comments}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-sm text-gray-500">Subscribers</h2>
            <p className="text-3xl font-bold">{stats.subscribers}</p>
          </div>

        </div>

        {/* Latest Post */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">
            Latest Published Post
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {stats.latestPost}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Analytics;