import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useArticleStore } from '../store/articleStore';
import ArticleGrid from '../components/articles/ArticleGrid';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { articles } = useArticleStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(articles);
  
  // Extract query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase()) ||
        article.summary.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filteredArticles);
    } else {
      setSearchResults([]);
    }
  }, [location.search, articles]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        
        {/* Search Form */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#0F172A] text-white px-6 py-2 rounded-r-lg hover:bg-[#1E293B] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
        
        {/* Results */}
        {searchQuery ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
              </p>
            </div>
            
            {searchResults.length > 0 ? (
              <ArticleGrid articles={searchResults} />
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No results found</h2>
                <p className="text-gray-600">
                  We couldn't find any articles matching your search. Try different keywords or browse our categories.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Enter a search term</h2>
            <p className="text-gray-600">
              Start typing in the search box to find articles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;