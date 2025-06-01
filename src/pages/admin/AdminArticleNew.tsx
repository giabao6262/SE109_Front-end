import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticleStore } from '../../store/articleStore';
import ArticleForm from '../../components/admin/ArticleForm';

const AdminArticleNew: React.FC = () => {
  const { createArticle } = useArticleStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (formData: any, imageFile: File | null) => {
    try {
      if(!imageFile) throw new Error("Image file is required");
      await createArticle(formData, imageFile);
      navigate('/admin/articles');
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to create article. Please try again.");
      // Optionally show an error message to the user
    }
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