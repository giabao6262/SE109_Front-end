import React, { useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useArticleStore } from '../../store/articleStore';
import ArticleForm from '../../components/admin/ArticleForm';
import { el, fi } from 'date-fns/locale';

const AdminArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getArticleById,fetchArticleById, updateArticle } = useArticleStore();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);
  const [article, setArticle] = React.useState<any>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      const existing = getArticleById(id);
      if (existing) {
        setArticle(existing);
        setLoading(false);
        return;
      }
      try {
        const fetched = await fetchArticleById(id);
        if (!fetched) {
          setNotFound(true);
        } else {
          setArticle(fetched);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  },[id]);
  
  

  const handleSubmit = async (formData: any, imageFile: File | null) => {
    if (!id) return;

    try {
      await updateArticle(id, formData, imageFile);
      navigate('/admin/articles');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update article');
    }
  };
  
  const handleCancel = () => {
    navigate('/admin/articles');
  };

  if (loading) return <p>Loading...</p>;
  if (notFound) return <Navigate to="/admin/articles" />;
  
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