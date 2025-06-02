import React from 'react';
import { TrendingUp, FileText, Users, Eye } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  icon: 'articles' | 'visitors' | 'views';
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, icon, change }) => {
  const getIcon = () => {
    switch (icon) {
      case 'articles':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'visitors':
        return <Users className="h-6 w-6 text-green-500" />;
      case 'views':
        return <Eye className="h-6 w-6 text-purple-500" />;
      default:
        return <TrendingUp className="h-6 w-6 text-gray-500" />;
    }
  };

  const getIconBackground = () => {
    switch (icon) {
      case 'articles':
        return 'bg-blue-100';
      case 'visitors':
        return 'bg-green-100';
      case 'views':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${getIconBackground()}`}>
          {getIcon()}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
      
      
    </div>
  );
};

export default AnalyticsCard;