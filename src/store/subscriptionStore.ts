import { create } from "zustand";
import { Subscription } from "../types";
import { mockSubscriptions } from "../mockData/subscriptions";
import { subscriptionApi } from "../services/subscriptionApi";

interface SubscriptionState {
  subscriptions: Subscription[];
  isSubscribed: boolean;
  isLoading: boolean;
  subscribe: () => Promise<{ success: boolean; message: string }>;
  unsubscribe: () => Promise<{ success: boolean; message: string }>;
  checkSubscriptionStatus: () => Promise<void>;
  sendNotification: (
    message: string
  ) => Promise<{ success: boolean; message: string }>;
  getSubscriptions: () => Subscription[];
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscriptions: [...mockSubscriptions],
  isSubscribed: false,
  isLoading: false,

  subscribe: async () => {
    try {
      set({ isLoading: true });
      const response = await subscriptionApi.subscribe();

      if (response.success) {
        set({ isSubscribed: true });
        return {
          success: true,
          message: "Successfully subscribed to newsletter!",
        };
      }

      return {
        success: false,
        message: response.message || "Failed to subscribe",
      };
    } catch (error) {
      console.error("Subscribe error:", error);
      return {
        success: false,
        message: "An error occurred while subscribing",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  unsubscribe: async () => {
    try {
      set({ isLoading: true });
      const response = await subscriptionApi.unsubscribe();

      if (response.success) {
        set({ isSubscribed: false });
        return {
          success: true,
          message: "Successfully unsubscribed from newsletter",
        };
      }

      return {
        success: false,
        message: response.message || "Failed to unsubscribe",
      };
    } catch (error) {
      console.error("Unsubscribe error:", error);
      return {
        success: false,
        message: "An error occurred while unsubscribing",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  checkSubscriptionStatus: async () => {
    try {
      set({ isLoading: true });
      const response = await subscriptionApi.checkStatus();

      if (response.success) {
        set({ isSubscribed: response.isSubscribed });
      }
    } catch (error) {
      console.error("Check subscription status error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  sendNotification: async (message: string) => {
    try {
      set({ isLoading: true });
      const response = await subscriptionApi.sendNotification(message);

      if (response.success) {
        return {
          success: true,
          message: "Notification sent successfully to all subscribers",
        };
      }

      return {
        success: false,
        message: response.message || "Failed to send notification",
      };
    } catch (error) {
      console.error("Send notification error:", error);
      return {
        success: false,
        message: "An error occurred while sending notification",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  getSubscriptions: () => get().subscriptions,
}));
