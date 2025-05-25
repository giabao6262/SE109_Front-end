import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, UsersRound, BarChart, Settings } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: 'Articles',
      path: '/admin/articles',
      icon: <FileText className="h-5 w-5" />
    },
    {
      name: 'Analytics',
      path: '/admin/analytics',
      icon: <BarChart className="h-5 w-5" />
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <div className="bg-[#0F172A] text-white h-screen w-64 fixed left-0 top-0 z-10 shadow-lg">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2 py-4">
          <span className="text-xl font-bold text-[#F59E0B]">FootballNews</span>
        </Link>
        
        <div className="mt-8 space-y-2">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-[#1E293B] text-[#F59E0B]'
                  : 'hover:bg-[#1E293B] text-gray-300'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Link to="/" className="flex items-center space-x-2 text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-colors">
          <span>View Site</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;