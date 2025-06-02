import { Analytics } from "../types";
import Cookies from "js-cookie";

const API = 'http://localhost:3000/api/analytics';
const VISIT_COOKIE_NAME = 'last_visit';



export const analyticsApi = {
  getSummary: async () => {
    const res = await fetch(`${API}/summary`, { credentials: 'include' });
    const json = await res.json();
    return json.data;
  },

  getArticlesByCategory: async () => {
    const res = await fetch(`${API}/articles-by-category`, { credentials: 'include' });
    const json = await res.json();
    return json.data; // [{ category_name, count }]
  },

  getMostViewedArticles: async (limit = 5) => {
    const res = await fetch(`${API}/most-viewed-articles?limit=${limit}`, {
      credentials: 'include'
    });
    const json = await res.json();
    return json.data; // [{ id, title, views }]
  },

  getVisitorTrends: async (year: number, month: number) => {
    const res = await fetch(`${API}/visitor-trends?year=${year}&month=${month}`, {
      credentials: 'include'
    });
    const json = await res.json();
    return json.data;
  },

  recordVisit: async () => {
    const lastVisit = Cookies.get(VISIT_COOKIE_NAME);

    if (lastVisit) {
      console.log('Visit already recorded within timeframe');
      return;
    }

    const res = await fetch(`${API}/record-visit`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to record visit');
    }

    Cookies.set(VISIT_COOKIE_NAME, 'true', { expires: 23 / 24 }); 
  },
};
