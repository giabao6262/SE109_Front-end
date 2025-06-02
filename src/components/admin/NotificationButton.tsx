import React, { useState } from "react";
import { Bell } from "lucide-react";
import { useSubscriptionStore } from "../../store/subscriptionStore";

const NotificationButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { sendNotification } = useSubscriptionStore();

  const handleSendNotification = async () => {
    setIsLoading(true);
    setNotificationSent(false);
    setErrorMessage("");

    try {
      const result = await sendNotification("Check out our latest articles!");

      if (result.success) {
        setNotificationSent(true);
        // Reset success message after 5 seconds
        setTimeout(() => {
          setNotificationSent(false);
        }, 5000);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("Failed to send notification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">
        Send Newsletter Notification
      </h2>
      <p className="text-gray-600 mb-4">
        Send a notification email to all subscribers about the latest articles.
      </p>

      {notificationSent && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
          <p className="text-green-700 text-sm">
            Notification successfully sent to all subscribers!
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      <button
        onClick={handleSendNotification}
        disabled={isLoading}
        className="inline-flex items-center bg-[#0F172A] text-white px-4 py-2 rounded-lg hover:bg-[#1E293B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            Sending...
          </>
        ) : (
          <>
            <Bell className="h-4 w-4 mr-2" />
            Send Notification to Subscribers
          </>
        )}
      </button>
    </div>
  );
};

export default NotificationButton;
