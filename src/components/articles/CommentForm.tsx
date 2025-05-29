import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useArticleStore } from "../../store/articleStore";
import { MessageSquare } from "lucide-react";

interface CommentFormProps {
  articleId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { isAuthenticated, currentUser } = useAuthStore();
  const { addComment } = useArticleStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !currentUser) {
      setMessage("You must be logged in to comment.");
      return;
    }

    if (!content.trim()) {
      setMessage("Comment cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await addComment(articleId, content.trim());

      if (success) {
        setContent("");
        setMessage("Comment added successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage("Failed to add comment. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-gray-600">Please log in to leave a comment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-[#F59E0B]" />
        Leave a Comment
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
            rows={4}
            placeholder="Write your comment here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-[#0F172A] text-white px-4 py-2 rounded-lg hover:bg-[#1E293B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </button>

          {message && (
            <p
              className={`text-sm ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
