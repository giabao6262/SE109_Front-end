import React from "react";
import { Link } from "react-router-dom";
import { Clock, MessageSquare, Eye } from "lucide-react";
import { Article } from "../../types";
import { formatDistanceToNow } from "date-fns";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = "default",
}) => {
  const published = new Date(article.publishedDate);
  const timeAgo = formatDistanceToNow(published, { addSuffix: true });

  if (variant === "featured") {
    return (
      <Link to={`/article/${article.id}`} className="group">
        <div className="relative h-[400px] overflow-hidden rounded-xl">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-medium">
                {article.category.name}
              </span>
              <span className="text-gray-300 text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {timeAgo}
              </span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2 group-hover:text-[#F59E0B] transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-300 mb-4 line-clamp-2">{article.summary}</p>
            <div className="flex items-center space-x-4">
              {" "}
              <div className="flex items-center">
                {" "}
                <img
                  src={
                    article.author.profile_picture_url
                      ? `http://localhost:3000${article.author.profile_picture_url}`
                      : "/default-avatar.png"
                  }
                  alt={article.author.username}
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span className="text-white text-sm">
                  {article.author.username}
                </span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{article.comments.length}</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Eye className="h-4 w-4 mr-1" />
                <span>{article.views}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/article/${article.id}`} className="group flex space-x-4">
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-medium text-[#F59E0B]">
              {article.category.name}
            </span>
            <span className="text-gray-500 text-xs flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {timeAgo}
            </span>
          </div>
          <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-[#F59E0B] transition-colors">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link to={`/article/${article.id}`} className="group block h-full">
      <div className="bg-white shadow-md rounded-xl overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-[#F59E0B] bg-opacity-10 text-[#F59E0B] px-2 py-1 rounded-full text-xs font-medium">
              {article.category.name}
            </span>
            <span className="text-gray-500 text-xs flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {timeAgo}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-[#F59E0B] transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
            {article.summary}
          </p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            {" "}
            <div className="flex items-center">
              {" "}
              <img
                src={
                  article.author.profile_picture_url
                    ? `http://localhost:3000${article.author.profile_picture_url}`
                    : "/default-avatar.png"
                }
                alt={article.author.username}
                className="h-6 w-6 rounded-full mr-2"
              />
              <span className="text-gray-700 text-xs">
                {article.author.username}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-500 text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>{article.comments.length}</span>
              </div>
              <div className="flex items-center text-gray-500 text-xs">
                <Eye className="h-3 w-3 mr-1" />
                <span>{article.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
