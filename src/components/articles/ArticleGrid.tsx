import React from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '../../types';

interface ArticleGridProps {
  articles: Article[];
  featured?: boolean;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, featured = false }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No articles found.</p>
      </div>
    );
  }
  
  if (featured) {
    const featuredArticle = articles[0];
    const remainingArticles = articles.slice(1, 7);
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ArticleCard article={featuredArticle} variant="featured" />
        </div>
        <div className="lg:col-span-1 space-y-6">
          {remainingArticles.slice(0, 3).map(article => (
            <ArticleCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;