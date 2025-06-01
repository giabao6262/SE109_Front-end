import { create } from 'zustand';
import { analyticsApi } from '../services/analyticsApi';

interface AnalyticsStore {
  totalVisitors: number;
  totalArticles: number;
  totalViews: number;
  subscribedUsers: number;
  articlesPerCategory: Record<string, number>;
  topArticles: { id: string; title: string; views: number }[];
  visitorTrends: { week_start: string; total_visitors: number }[];
  isLoading: boolean;

  fetchAnalytics: () => Promise<void>;
  getAnalytics: () => Omit<AnalyticsStore, 'fetchAnalytics' | 'getAnalytics' | 'isLoading'>;
}

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
  totalVisitors: 0,
  totalArticles: 0,
  totalViews: 0,
  subscribedUsers: 0,
  articlesPerCategory: {},
  topArticles: [],
  visitorTrends: [],
  isLoading: false,

  fetchAnalytics: async () => {
    set({ isLoading: true });
    try {
      const [summary, categoryData, topArticles, trends] = await Promise.all([
        analyticsApi.getSummary(),
        analyticsApi.getArticlesByCategory(),
        analyticsApi.getMostViewedArticles(),
        analyticsApi.getVisitorTrends(new Date().getFullYear(), new Date().getMonth() + 1),
      ]);

      const perCategory: Record<string, number> = {};
      for (const item of categoryData) {
        perCategory[item.category_name] = item.count;
      }

      set({
        totalVisitors: summary.totalVisitors,
        totalArticles: summary.totalArticles,
        totalViews: summary.totalViews,
        subscribedUsers: summary.subscribedUsers,
        articlesPerCategory: perCategory,
        topArticles,
        visitorTrends: trends,
      });
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  getAnalytics: () => {
    const state = get();
    const { fetchAnalytics, getAnalytics, isLoading, ...data } = state;
    return data;
  }

  
}));
