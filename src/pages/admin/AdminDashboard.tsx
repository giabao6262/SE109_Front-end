import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp } from 'lucide-react';
import { useArticleStore } from '../../store/articleStore';
import { useAnalyticsStore } from '../../store/analyticsStore';
import AnalyticsCard from '../../components/admin/AnalyticsCard';
import ArticleCard from '../../components/articles/ArticleCard';

const AdminDashboard: React.FC = () => {
  const { articles, fetchArticles, getCategoryById, categories } = useArticleStore();
  const { fetchAnalytics, getAnalytics, isLoading } = useAnalyticsStore();

  useEffect(() => {
    fetchArticles();      // ← tải danh sách bài viết
    fetchAnalytics();     // ← tải số liệu thống kê
  }, []);

  const analytics = getAnalytics();
  if (isLoading || articles.length === 0) {
  return <p>Loading dashboard...</p>;
}


  const recentArticles = [...articles].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()).slice(0, 3);

  
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 3);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/admin/articles/new"
          className="inline-flex items-center bg-[#0F172A] text-white px-4 py-2 rounded-lg hover:bg-[#1E293B] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Link>
      </div>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard
          title="Total Articles"
          value={analytics.totalArticles}
          icon="articles"
          change={{ value: 8, isPositive: true }}
        />
        <AnalyticsCard
          title="Total Visitors"
          value={analytics.totalVisitors}
          icon="visitors"
          change={{ value: 12, isPositive: true }}
        />
        <AnalyticsCard
  title="Total Views"
  value={analytics.totalViews} // ✅ Dữ liệu backend
  icon="views"
  change={{ value: 5, isPositive: true }}
/>

      </div>
      
      {/* Category Distribution */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Articles by Category</h2>
        <div className="space-y-4">
          {Object.entries(analytics.articlesPerCategory).map(([categoryName, count]) => {
  const category = categories.find(c => c.name === categoryName); // fallback nếu id bị mismatch
  if (!category) return null;

  const percentage = (count / Math.max(analytics.totalArticles, 1)) * 100;

  return (
    <div key={categoryName}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{category.name}</span>
        <span className="text-sm text-gray-500">{count} articles</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-[#F59E0B] h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
})}

        </div>
      </div>
      
      {/* Recent and Popular Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Articles */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Articles</h2>
            <Link to="/admin/articles" className="text-[#F59E0B] hover:underline text-sm">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentArticles.map(article => (
              <ArticleCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </div>
        
        {/* Popular Articles */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Popular Articles</h2>
            <Link to="/admin/articles" className="text-[#F59E0B] hover:underline text-sm">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <div key={article.id} className="flex items-center">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mr-3">
                  {index + 1}
                </span>
                <ArticleCard article={article} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;