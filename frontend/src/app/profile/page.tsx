'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings, 
  Edit3, 
  Save, 
  X, 
  Check, 
  AlertCircle,
  Camera,
  Upload,
  Sparkles
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!name || name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await api.put('/user/profile', { name: name.trim() });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      const updatedUser = response.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setIsEditing(false);
    setError('');
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
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-100">
        <Navbar />
        
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 sticky top-8">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                      {user?.name ? getInitials(user.name) : 'U'}
                    </div>
                    <button className="absolute bottom-2 right-0 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                  <p className="text-gray-500 mb-4">{user?.email}</p>
                  
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
                    <Shield className="w-4 h-4" />
                    Verified Account
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <div>
                      <p className="text-sm font-medium">Member since</p>
                      <p className="text-sm">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Settings className="w-5 h-5" />
                    <div>
                      <p className="text-sm font-medium">Account Status</p>
                      <p className="text-sm text-green-600">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                        <p className="text-gray-500 text-sm">Manage your account details and preferences</p>
                      </div>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-8">
                  {message && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg animate-in slide-in-from-left duration-300">
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-2" />
                        <p className="text-sm text-green-700 font-medium">{message}</p>
                      </div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-in slide-in-from-left duration-300">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                        <button onClick={() => setError('')} className="ml-auto">
                          <X className="w-4 h-4 text-red-400 hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          disabled
                          value={user?.email || ''}
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Email cannot be changed for security reasons
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <User className="w-4 h-4" />
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <div className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900">
                            {user?.name || 'Not provided'}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Calendar className="w-4 h-4" />
                        Account Created
                      </label>
                      <input
                        type="text"
                        disabled
                        value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'N/A'}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    
                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="flex-1 px-6 py-3 text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Account Statistics</h3>
                      <p className="text-gray-500 text-sm">Your activity overview</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                      <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                      <div className="text-sm text-gray-600">Total Tasks</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100">
                      <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                      <div className="text-3xl font-bold text-purple-600 mb-2">0%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Security Settings</h3>
                      <p className="text-gray-500 text-sm">Manage your account security</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">Change Password</h4>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                        Update
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
