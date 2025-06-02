import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "../../types";
import {
  ThumbsUp,
  MessageSquare,
  Edit2,
  Trash2,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useArticleStore } from "../../store/articleStore";

interface CommentListProps {
  comments: Comment[];
  articleId: string;
}

const CommentList: React.FC<CommentListProps> = ({ comments, articleId }) => {
  const { currentUser, isAuthenticated } = useAuthStore();
  const { updateComment, deleteComment, likeComment } = useArticleStore();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState(5);

  const showMoreComments = () => {
    setVisibleComments((prevVisible) => prevVisible + 5);
  };

  // Check if the current user is the author of the comment
  const isCommentAuthor = (comment: Comment) => {
    return currentUser && comment.author.id === currentUser.id;
  };

  // Handle editing a comment
  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
    setErrorMessage("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
    setErrorMessage("");
  }; // Save edited comment
  const handleSaveEdit = async (commentId: string) => {
    if (!editContent.trim()) {
      setErrorMessage("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await updateComment(articleId, commentId, editContent);
      if (success) {
        setEditingCommentId(null);
        setErrorMessage("");
        // No need to call fetchArticleById, the store already updates local state
      } else {
        setErrorMessage("Failed to update comment");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the comment");
      console.error("Error updating comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  }; // Handle deleting a comment
  const handleDeleteClick = (commentId: string) => {
    setCommentToDelete(commentId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!commentToDelete) return;

    setIsSubmitting(true);
    try {
      const success = await deleteComment(articleId, commentToDelete);
      if (!success) {
        setErrorMessage("Failed to delete comment");
      }
      // No need to call fetchArticleById, the store already updates local state
    } catch (error) {
      setErrorMessage("An error occurred while deleting the comment");
      console.error("Error deleting comment:", error);
    } finally {
      setIsSubmitting(false);
      setShowDeleteModal(false);
      setCommentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  }; // Handle liking a comment
  const handleLikeComment = async (commentId: string) => {
    if (!isAuthenticated) {
      setErrorMessage("You must be logged in to like comments");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await likeComment(articleId, commentId);
      if (!success) {
        setErrorMessage("Failed to like comment");
      }
      // No need to call fetchArticleById, the store already updates local state
    } catch (error) {
      setErrorMessage("An error occurred while liking the comment");
      console.error("Error liking comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!comments || comments.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-gray-500">
          No comments yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-[#F59E0B]" />
        Comments ({comments.length})
        {visibleComments < comments.length && (
          <span className="text-sm font-normal ml-2 text-gray-500">
            (Show {Math.min(visibleComments, comments.length)} out of{" "}
            {comments.length})
          </span>
        )}
      </h3>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      <div className="space-y-4">
        {comments.slice(0, visibleComments).map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start space-x-3">
              {" "}
              <img
                src={
                  comment.author.profile_picture_url
                    ? comment.author.profile_picture_url.startsWith("http")
                      ? comment.author.profile_picture_url
                      : `http://localhost:3000${comment.author.profile_picture_url}`
                    : "/default-avatar.png"
                }
                alt={comment.author.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">
                    {comment.author.username}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.date), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                {editingCommentId === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      disabled={isSubmitting}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center text-gray-600 hover:text-gray-800 px-2 py-1 rounded"
                        disabled={isSubmitting}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(comment.id)}
                        className="flex items-center bg-[#0F172A] text-white px-3 py-1 rounded hover:bg-[#1E293B] transition-colors disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                )}

                <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
                  <button
                    className={`flex items-center transition-colors ${
                      isAuthenticated ? "hover:text-[#F59E0B]" : ""
                    }`}
                    onClick={() => handleLikeComment(comment.id)}
                    disabled={!isAuthenticated || isSubmitting}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{comment.likes}</span>
                  </button>

                  {isCommentAuthor(comment) &&
                    editingCommentId !== comment.id && (
                      <>
                        <button
                          className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                          onClick={() => handleEditClick(comment)}
                          disabled={isSubmitting}
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </button>{" "}
                        <button
                          className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
                          onClick={() => handleDeleteClick(comment.id)}
                          disabled={isSubmitting}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {visibleComments < comments.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={showMoreComments}
              className="bg-[#F59E0B] text-white px-4 py-2 rounded-md hover:bg-[#D97706] transition-colors"
            >
              Show More Comments
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-center mb-4 text-red-500">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              Delete Comment
            </h3>
            <p className="text-gray-700 text-center mb-6">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
