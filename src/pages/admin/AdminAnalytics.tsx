import React, { useEffect } from 'react';
import { useAnalyticsStore } from '../../store/analyticsStore';
import AnalyticsCard from '../../components/admin/AnalyticsCard';

const AdminAnalytics: React.FC = () => {
  const {
    fetchAnalytics,
    getAnalytics,
    isLoading,
  } = useAnalyticsStore();

  const {
    totalVisitors,
    totalArticles,
    totalViews,
    articlesPerCategory,
    topArticles,
    visitorTrends,
  } = getAnalytics();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const categoryData = Object.entries(articlesPerCategory).map(([name, count]) => ({
    name,
    value: count
  }));

  const viewsData = topArticles.map(a => ({
    name: a.title.length > 20 ? a.title.slice(0, 20) + '...' : a.title,
    views: a.views
  }));

  if (isLoading) {
    return <p>Loading analytics...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Analytics</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard title="Total Articles" value={totalArticles} icon="articles" />
        <AnalyticsCard title="Total Visitors" value={totalVisitors} icon="visitors" />
        <AnalyticsCard title="Total Views" value={totalViews} icon="views" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Articles by Category</h2>
          <div className="space-y-4">
            {categoryData.map((item, index) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span>{item.value} articles</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${(item.value / Math.max(...categoryData.map(c => c.value), 1)) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed Articles */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Most Viewed Articles</h2>
          <div className="space-y-4">
            {viewsData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span>{item.views} views</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#F59E0B] h-2.5 rounded-full"
                    style={{
                      width: `${(item.views / Math.max(...viewsData.map(d => d.views), 1)) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visitor Trends */}
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Visitor Trends</h2>
        <div className="space-y-2">
          {visitorTrends.map(trend => (
            <div key={trend.week_start} className="flex justify-between text-sm">
              <span>{trend.week_start}</span>
              <span>{trend.total_visitors} visitors</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
