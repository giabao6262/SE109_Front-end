import React, { useEffect } from "react";
import { useArticleStore } from "../store/articleStore";
import { useAnalyticsStore } from "../store/analyticsStore";
import ArticleGrid from "../components/articles/ArticleGrid";
import CategoryFilter from "../components/articles/CategoryFilter";

const HomePage: React.FC = () => {
  const {
    articles,
    categories,
    selectedCategory,
    setSelectedCategory,
    getFilteredArticles,
    fetchArticles,
    isLoading,
  } = useArticleStore();

  const { incrementVisitors } = useAnalyticsStore();

  // Fetch articles and increment visitor count on page load
  useEffect(() => {
    fetchArticles();
    incrementVisitors();
  }, [fetchArticles, incrementVisitors]);

  const filteredArticles = getFilteredArticles();
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!isLoading && (
        <>
          {/* Featured Section */}
          <section className="mb-12">
            <h1 className="text-3xl font-bold mb-6">Latest News</h1>
            <ArticleGrid articles={articles.slice(0, 7)} featured={true} />
          </section>

          {/* Content Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold mb-6">
                  {selectedCategory
                    ? `${
                        categories.find((cat) => cat.id === selectedCategory)
                          ?.name
                      } News`
                    : "All News"}
                </h2>
                <ArticleGrid articles={filteredArticles} />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
