import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticleStore } from '../../store/articleStore';
import ArticleForm from '../../components/admin/ArticleForm';

const AdminArticleNew: React.FC = () => {
  const { createArticle } = useArticleStore();
  const navigate = useNavigate();
  
  const handleSubmit = (formData: any) => {
    createArticle(formData);
    navigate('/admin/articles');
  };
  
  const handleCancel = () => {
    navigate('/admin/articles');
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Create New Article</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <ArticleForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AdminArticleNew;