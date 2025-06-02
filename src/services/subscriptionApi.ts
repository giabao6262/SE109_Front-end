// Define the API base URL
const API_URL = "http://localhost:3000/api";

export const subscriptionApi = {
  subscribe: async () => {
    try {
      const response = await fetch(`${API_URL}/subscriptions/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Subscribe failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Subscribe error:", error);
      throw error;
    }
  },
  unsubscribe: async () => {
    try {
      const response = await fetch(`${API_URL}/subscriptions/unsubscribe`, {
        method: "DELETE",
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unsubscribe failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Unsubscribe error:", error);
      throw error;
    }
  },

  checkStatus: async () => {
    try {
      const response = await fetch(`${API_URL}/subscriptions/status`, {
        method: "GET",
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Check status failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Check subscription status error:", error);
      throw error;
    }
  },
  sendNotification: async (message: string) => {
    try {
      const response = await fetch(
        `${API_URL}/subscriptions/send-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
          credentials: "include", // Important for cookies
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Send notification failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Send notification error:", error);
      throw error;
    }
  },
};
