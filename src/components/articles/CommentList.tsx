import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from '../../types';
import { ThumbsUp, MessageSquare } from 'lucide-react';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-[#F59E0B]" />
        Comments ({comments.length})
      </h3>
      
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start space-x-3">
              <img
                src={comment.author.profilePicture}
                alt={comment.author.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{comment.author.username}</h4>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{comment.content}</p>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <button className="flex items-center hover:text-[#F59E0B] transition-colors">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;