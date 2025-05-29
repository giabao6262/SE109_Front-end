import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Clock, Tag, ArrowLeft, MessageSquare } from "lucide-react";
import { useArticleStore } from "../store/articleStore";
import CommentList from "../components/articles/CommentList";
import CommentForm from "../components/articles/CommentForm";
import ArticleCard from "../components/articles/ArticleCard";
import { Article } from "../types";

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchArticleById, articles, getArticleById } = useArticleStore();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);
  const currentArticleId = useRef<string | null>(null);
  // Chỉ fetch bài viết một lần khi ID thay đổi
  useEffect(() => {
    // Nếu ID giống với ID hiện tại, không làm gì cả
    if (id === currentArticleId.current) {
      return;
    }

    // Cập nhật ID hiện tại
    currentArticleId.current = id || null;

    const loadArticle = async () => {
      if (!id) return;

      try {
        setIsLoading(true);

        // Thử lấy bài viết từ cache trước
        const cachedArticle = getArticleById(id);

        if (cachedArticle && !isInitialMount.current) {
          // Sử dụng bài viết từ cache nếu không phải lần đầu tiên
          // và truyền skipViewIncrement=true để không tăng view
          setArticle(cachedArticle);
          setError(null);
          setIsLoading(false);
          return;
        }
        // Nếu không có trong cache hoặc là lần đầu tiên, gọi API
        // Chỉ tăng view khi là lần đầu xem bài viết
        const fetchedArticle = await fetchArticleById(
          id,
          !isInitialMount.current
        );
        if (fetchedArticle) {
          setArticle(fetchedArticle);
          setError(null);
          isInitialMount.current = false;
        } else {
          setError("Article not found");
        }
      } catch (err) {
        console.error("Failed to load article:", err);
        setError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [id, fetchArticleById, getArticleById]);

  // Cập nhật dữ liệu bài viết khi store thay đổi
  useEffect(() => {
    if (id && articles.length > 0 && !isInitialMount.current) {
      const currentArticle = articles.find((a) => a.id === id);
      if (currentArticle) {
        setArticle(currentArticle);
        setError(null);
      }
    }
  }, [id, articles]);

  // Không tăng lượt xem ở front-end vì backend đã tự động tăng khi gọi API getArticleById
  // useEffect(() => {
  //   if (article && !viewCountUpdated.current) {
  //     updateArticle(article.id, { views: article.views + 1 });
  //     viewCountUpdated.current = true;
  //   }
  // }, [article, updateArticle]);
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <p className="text-gray-600 mb-6">
          {error ||
            "The article you're looking for doesn't exist or has been removed."}
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
          <p className="text-xl text-gray-600 mb-6">{article.summary}</p>{" "}
          <div className="flex items-center mb-6">
            <img
              src={article.author.profile_picture_url || "/default-avatar.png"}
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
        )}{" "}
        {/* Comments Section */}
        <div className="mt-12 space-y-8">
          {article.comments && article.comments.length > 0 ? (
            <CommentList comments={article.comments} articleId={article.id} />
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
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
