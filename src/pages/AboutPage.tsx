import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AlertCircle } from "lucide-react";

interface Author {
  name: string;
}

export const AboutPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("author")
        .not("author", "is", null);

      if (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
        return;
      }

      if (data) {
        // Remove duplicate author names
        const uniqueAuthors = Array.from(
          new Set(data.map((item: any) => item.author))
        ).map((name) => ({ name }));

        setAuthors(uniqueAuthors);
      }

      setLoading(false);
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-6">About TalePulse</h1>

      <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
        TalePulse is your trusted source for breaking news,
        in-depth analysis, and trending stories.
      </p>

      <h2 className="text-2xl font-bold mb-6">Our Authors</h2>

      {authors.length === 0 ? (
        <div className="text-center py-10">
          <AlertCircle size={40} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No authors found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {authors.map((author, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#1E3A8A] mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {author.name.charAt(0).toUpperCase()}
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {author.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Contributor at TalePulse
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutPage;