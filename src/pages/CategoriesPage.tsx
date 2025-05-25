import React from 'react';
import { Link } from 'react-router-dom';
import { useArticleStore } from '../store/articleStore';

const CategoriesPage: React.FC = () => {
  const { categories, articles } = useArticleStore();
  
  // Count articles per category
  const categoryCounts = categories.map(category => {
    const count = articles.filter(article => article.category.id === category.id).length;
    return { ...category, count };
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categoryCounts.map(category => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex justify-between items-center"
            >
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <span className="bg-[#F59E0B] bg-opacity-10 text-[#F59E0B] px-3 py-1 rounded-full text-sm font-medium">
                {category.count} {category.count === 1 ? 'article' : 'articles'}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Looking for something specific?</h2>
          <p className="text-gray-600 mb-4">
            If you can't find what you're looking for in our categories, try searching for specific keywords.
          </p>
          <Link
            to="/search"
            className="inline-block bg-[#0F172A] text-white px-4 py-2 rounded-lg hover:bg-[#1E293B] transition-colors"
          >
            Search Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;