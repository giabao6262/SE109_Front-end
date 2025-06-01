import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useArticleStore } from '../../store/articleStore';
import ArticleList from '../../components/admin/ArticleList';
import { Article } from '../../types';

const AdminArticles: React.FC = () => {
  const { articles, deleteArticle, fetchArticles } = useArticleStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; articleId: string | null }>({
    show: false,
    articleId: null
  });

  useEffect(() => {
     fetchArticles();
  }, []);
  
  // Filter articles based on search term
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteClick = (articleId: string) => {
    setConfirmDelete({ show: true, articleId });
  };
  
  const handleConfirmDelete = async () => {
  if (confirmDelete.articleId) {
    const success = await deleteArticle(confirmDelete.articleId);
    if (!success) alert('Failed to delete article');
  }
  setConfirmDelete({ show: false, articleId: null });
};

  
  const handleCancelDelete = () => {
    setConfirmDelete({ show: false, articleId: null });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link
          to="/admin/articles/new"
          className="inline-flex items-center bg-[#0F172A] text-white px-4 py-2 rounded-lg hover:bg-[#1E293B] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Link>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Articles List */}
      <ArticleList 
        articles={filteredArticles} 
        onEdit={(article: Article) => window.location.href = `/admin/articles/edit/${article.id}`}
        onDelete={handleDeleteClick} 
      />
      
      {/* Delete Confirmation Modal */}
      {confirmDelete.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this article? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticles;