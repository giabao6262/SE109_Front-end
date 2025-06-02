import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useSubscriptionStore } from "../store/subscriptionStore";
import {
  AlertCircle,
  Save,
  Upload,
  User,
  Mail,
  ArrowLeft,
  Bell,
  BellOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpdateProfile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useAuthStore();
  const { isSubscribed, checkSubscriptionStatus, subscribe, unsubscribe } =
    useSubscriptionStore();

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    Profile_Picture: currentUser?.profile_picture_url || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    currentUser?.profile_picture_url || null
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    // Check subscription status when component mounts
    checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setErrorMessage("Current password is required to set a new password.");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      if (formData.newPassword.length < 6) {
        setErrorMessage("Password must be at least 6 characters.");
        return;
      }
    }

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    if (formData.newPassword) data.append("password", formData.newPassword);
    if (imageFile) data.append("profilePicture", imageFile);

    const success = await updateProfile(data);
    if (success) {
      setSuccessMessage("Profile updated successfully.");
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setErrorMessage("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Update Profile</h2>
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
          <p className="text-green-700 text-sm">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded flex items-start">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-2" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center space-x-4">
          {previewImage ? (
            <img
              src={`http://localhost:3000${currentUser?.profile_picture_url}`}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="text-gray-500" />
            </div>
          )}
          <label className="cursor-pointer inline-flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded border border-gray-300">
            <Upload className="h-4 w-4 mr-1" />
            Change Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B]"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Password Section */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <div className="space-y-4">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B]"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B]"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B]"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>{" "}
        {/* Subscription Section */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Subscription</h3>

          {isSubscribed ? (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Bell className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-600 font-medium">
                  You are currently subscribed to our newsletter.
                </span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const result = await unsubscribe();
                  if (result.success) {
                    setSuccessMessage(
                      "Successfully unsubscribed from newsletter."
                    );
                  } else {
                    setErrorMessage("Failed to unsubscribe. Please try again.");
                  }
                }}
                className="inline-flex items-center text-red-600 hover:text-red-800"
              >
                <BellOff className="h-4 w-4 mr-1" />
                Unsubscribe
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <BellOff className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">
                  You are not subscribed to our newsletter.
                </span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const result = await subscribe();
                  if (result.success) {
                    setSuccessMessage("Successfully subscribed to newsletter!");
                  } else {
                    setErrorMessage("Failed to subscribe. Please try again.");
                  }
                }}
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <Bell className="h-4 w-4 mr-1" />
                Subscribe to newsletter
              </button>
            </div>
          )}

          <p className="text-sm text-gray-500">
            {isSubscribed
              ? "You will receive email notifications about new articles and updates."
              : "Subscribe to receive email notifications about new articles and updates."}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center bg-[#0F172A] text-white px-4 py-2 rounded-lg hover:bg-[#1E293B] transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
