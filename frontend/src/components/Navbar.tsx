'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { User, LogOut, Settings, Home, BarChart3, Bell, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    router.push('/profile');
    setIsProfileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsProfileMenuOpen(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              href={user ? "/dashboard" : "/"} 
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                TaskManager
              </span>
            </Link>
          </div>

          {user && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              
              <div className="relative">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {notifications > 9 ? '9+' : notifications}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  onKeyDown={handleKeyDown}
                  className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {getInitials(user.name)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="font-medium text-sm">Hello, {user.name.split(' ')[0]}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-10 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 truncate">{user.email}</div>
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={handleDashboardClick}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                      
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </button>
                      
                      <button
                        className="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Preferences</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {isProfileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0 md:hidden" 
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
