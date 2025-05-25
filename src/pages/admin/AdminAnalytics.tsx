import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { useArticleStore } from '../../store/articleStore';
import AnalyticsCard from '../../components/admin/AnalyticsCard';

// Note: This is a simplified version without actual Recharts
// In a real application, you would install and use recharts
const AdminAnalytics: React.FC = () => {
  const { getAnalytics } = useAnalyticsStore();
  const { articles, categories } = useArticleStore();
  
  const analytics = getAnalytics();
  
  // Create data for category distribution chart
  const categoryData = categories.map(category => {
    const count = analytics.articlesPerCategory[category.id] || 0;
    return {
      name: category.name,
      value: count
    };
  });
  
  // Create data for views by article chart
  const viewsData = analytics.topArticles.map(article => ({
    name: article.title.length > 20 ? article.title.substring(0, 20) + '...' : article.title,
    views: article.views
  }));
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Analytics</h1>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard
          title="Total Articles"
          value={analytics.totalArticles}
          icon="articles"
        />
        <AnalyticsCard
          title="Total Visitors"
          value={analytics.totalVisitors}
          icon="visitors"
        />
        <AnalyticsCard
          title="Total Views"
          value={articles.reduce((sum, article) => sum + article.views, 0)}
          icon="views"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Articles by Category</h2>
          <div className="h-64">
            {/* This would be a real chart in a production app */}
            <div className="space-y-4">
              {categoryData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.value} articles</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${(item.value / analytics.totalArticles) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Most Viewed Articles */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Most Viewed Articles</h2>
          <div className="h-64">
            {/* This would be a real chart in a production app */}
            <div className="space-y-4">
              {viewsData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.views} views</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-[#F59E0B] h-2.5 rounded-full" 
                      style={{ 
                        width: `${(item.views / Math.max(...viewsData.map(d => d.views))) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Visitor Trends - Simplified version */}
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Visitor Trends</h2>
        <p className="text-center text-gray-500 py-8">
          This would display a visitor trend chart in a production application.
        </p>
      </div>
    </div>
  );
};

export default AdminAnalytics;