import { create } from 'zustand';
import { Analytics } from '../types';
import { useArticleStore } from './articleStore';

interface AnalyticsState {
  totalVisitors: number;
  getAnalytics: () => Analytics;
  incrementVisitors: () => void;
}

// Initial mock values
const initialVisitors = 15738;

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  totalVisitors: initialVisitors,
  
  getAnalytics: () => {
    const articles = useArticleStore.getState().articles;
    const categories = useArticleStore.getState().categories;
    
    // Calculate articles per category
    const articlesPerCategory: Record<string, number> = {};
    categories.forEach(category => {
      articlesPerCategory[category.id] = articles.filter(
        article => article.category.id === category.id
      ).length;
    });
    
    // Get top articles by views
    const topArticles = [...articles]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(article => ({
        id: article.id,
        title: article.title,
        views: article.views
      }));
    
    return {
      totalVisitors: get().totalVisitors,
      totalArticles: articles.length,
      articlesPerCategory,
      topArticles
    };
  },
  
  incrementVisitors: () => {
    set(state => ({
      totalVisitors: state.totalVisitors + 1
    }));
  }
}));