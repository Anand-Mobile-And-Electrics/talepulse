import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Comment {
  id: string;
  name: string;
  content: string;
  approved: boolean;
  created_at: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setComments(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const toggleApprove = async (id: string, approved: boolean) => {
    await supabase
      .from("comments")
      .update({ approved: !approved })
      .eq("id", id);

    fetchComments();
  };

  const deleteComment = async (id: string) => {
    if (!window.confirm("Delete this comment?")) return;

    await supabase.from("comments").delete().eq("id", id);
    fetchComments();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6">Comments</h1>

        {loading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments found.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{comment.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                  <p>{comment.content}</p>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                  <button
                    onClick={() =>
                      toggleApprove(comment.id, comment.approved)
                    }
                    className={`px-3 py-1 rounded ${
                      comment.approved
                        ? "bg-green-600 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {comment.approved ? "Approved" : "Approve"}
                  </button>

                  <button
                    onClick={() => deleteComment(comment.id)}
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

export default Comments;