import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useArticleStore } from '../store/articleStore';
import ArticleGrid from '../components/articles/ArticleGrid';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { articles, categories } = useArticleStore();
  
  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/categories"
          className="inline-flex items-center px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Link>
      </div>
    );
  }
  
  const categoryArticles = articles.filter(article => article.category.id === category.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/categories" className="inline-flex items-center text-[#0F172A] hover:text-[#F59E0B] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          All Categories
        </Link>
        
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-gray-600 mt-2">
          Latest news and updates from {category.name}
        </p>
      </div>
      
      {categoryArticles.length > 0 ? (
        <ArticleGrid articles={categoryArticles} featured={categoryArticles.length >= 4} />
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No articles found</h2>
          <p className="text-gray-600">
            We don't have any articles in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;