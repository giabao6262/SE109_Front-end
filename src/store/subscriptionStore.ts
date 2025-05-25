import { create } from 'zustand';
import { Subscription } from '../types';
import { mockSubscriptions } from '../mockData/subscriptions';

interface SubscriptionState {
  subscriptions: Subscription[];
  subscribe: (email: string) => { success: boolean; message: string };
  getSubscriptions: () => Subscription[];
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscriptions: [...mockSubscriptions],
  
  subscribe: (email) => {
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { 
        success: false, 
        message: 'Please enter a valid email address.'
      };
    }
    
    // Check if already subscribed
    if (get().subscriptions.some(sub => sub.email === email)) {
      return { 
        success: false, 
        message: 'This email is already subscribed to our newsletter.'
      };
    }
    
    // Add new subscription
    const newSubscription: Subscription = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      date: new Date().toISOString(),
    };
    
    set(state => ({
      subscriptions: [...state.subscriptions, newSubscription]
    }));
    
    return { 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!'
    };
  },
  
  getSubscriptions: () => get().subscriptions,
}));