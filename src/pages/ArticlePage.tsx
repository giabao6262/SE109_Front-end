import React, { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Clock, Tag, ArrowLeft } from "lucide-react";
import { useArticleStore } from "../store/articleStore";
import CommentList from "../components/articles/CommentList";
import CommentForm from "../components/articles/CommentForm";
import ArticleCard from "../components/articles/ArticleCard";

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getArticleById, updateArticle, articles } = useArticleStore();
  const viewCountUpdated = useRef(false);

  const article = id ? getArticleById(id) : undefined;

  // Increase view count on page load, but only once
  useEffect(() => {
    if (article && !viewCountUpdated.current) {
      updateArticle(article.id, { views: article.views + 1 });
      viewCountUpdated.current = true;
    }
  }, [article, updateArticle]);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <p className="text-gray-600 mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
      </div>
    );
  }

  // Get related articles from the same category
  const relatedArticles = articles
    .filter((a) => a.category.id === article.category.id && a.id !== article.id)
    .slice(0, 3);

  const publishedDate = new Date(article.publishedDate);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center text-[#0F172A] hover:text-[#F59E0B] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Link
              to={`/categories/${article.category.slug}`}
              className="bg-[#F59E0B] bg-opacity-10 text-[#F59E0B] px-3 py-1 rounded-full text-sm font-medium"
            >
              {article.category.name}
            </Link>
            <span className="text-gray-500 text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDistanceToNow(publishedDate, { addSuffix: true })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">{article.summary}</p>

          <div className="flex items-center mb-6">
            <img
              src={article.author.profilePicture}
              alt={article.author.username}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{article.author.username}</p>
              <p className="text-sm text-gray-500">Editor</p>
            </div>
          </div>
        </div>

        {/* Article Cover Image */}
        <div className="mb-8">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Article Content */}
        <div
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 pt-4 border-t border-gray-200">
            <Tag className="h-4 w-4 text-gray-500" />
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-12 space-y-8">
          <CommentList comments={article.comments} />
          <CommentForm articleId={article.id} />
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
