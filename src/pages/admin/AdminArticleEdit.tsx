import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useArticleStore } from '../../store/articleStore';
import ArticleForm from '../../components/admin/ArticleForm';

const AdminArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getArticleById, updateArticle } = useArticleStore();
  const navigate = useNavigate();
  
  const article = id ? getArticleById(id) : undefined;
  
  if (!article) {
    return <Navigate to="/admin/articles" />;
  }
  
  const handleSubmit = (formData: any) => {
    updateArticle(article.id, {
      ...formData,
      updatedDate: new Date().toISOString()
    });
    navigate('/admin/articles');
  };
  
  const handleCancel = () => {
    navigate('/admin/articles');
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Edit Article</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <ArticleForm
          article={article}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AdminArticleEdit;