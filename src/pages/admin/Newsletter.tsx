import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Subscriber {
  id: string;
  email: string;
  subscribed: boolean;
  created_at: string;
}

const Newsletter: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setSubscribers(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const toggleStatus = async (id: string, status: boolean) => {
    await supabase
      .from("newsletter_subscribers")
      .update({ subscribed: !status })
      .eq("id", id);

    fetchSubscribers();
  };

  const deleteSubscriber = async (id: string) => {
    if (!window.confirm("Delete this subscriber?")) return;

    await supabase
      .from("newsletter_subscribers")
      .delete()
      .eq("id", id);

    fetchSubscribers();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>

        {loading ? (
          <p className="text-gray-500">Loading subscribers...</p>
        ) : subscribers.length === 0 ? (
          <p className="text-gray-500">No subscribers found.</p>
        ) : (
          <div className="space-y-4">
            {subscribers.map((sub) => (
              <div
                key={sub.id}
                className="flex justify-between items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <div>
                  <p className="font-semibold">{sub.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(sub.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() =>
                      toggleStatus(sub.id, sub.subscribed)
                    }
                    className={`px-3 py-1 rounded text-sm ${
                      sub.subscribed
                        ? "bg-green-600 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {sub.subscribed ? "Subscribed" : "Unsubscribed"}
                  </button>

                  <button
                    onClick={() => deleteSubscriber(sub.id)}
                    className="text-red-600 dark:text-red-400"
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

export default Newsletter;