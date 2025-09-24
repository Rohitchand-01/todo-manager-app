'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Smartphone, 
  Shield, 
  ListTodo,
  Sparkles,
  Users,
  Star,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Globe,
  Loader2
} from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-gray-600 font-medium">Loading TaskManager...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16 text-center lg:pt-32">
          
            
            <h1 className="mx-auto max-w-5xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl lg:text-8xl mb-6">
              Task Management
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-slate-600 font-medium">
              Organize your tasks, boost productivity, and achieve your goals with our intuitive task management platform. Join thousands of users who trust TaskManager.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9★</div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>
        </div>

        <div className="py-24 bg-white/50 backdrop-blur-sm border-y border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Star className="w-4 h-4" />
                Premium Features
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything you need to stay organized
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful features designed to help you manage tasks efficiently and boost your productivity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Authentication</h3>
                <p className="text-gray-600 mb-4">
                  JWT-based authentication with advanced security features and password hashing for maximum protection.
                </p>
              </div>

              <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ListTodo className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Task Management</h3>
                <p className="text-gray-600 mb-4">
                  Create, organize, and prioritize tasks with advanced filtering, due dates, and status tracking.
                </p>
                
              </div>

              <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Search</h3>
                <p className="text-gray-600 mb-4">
                  Find any task instantly with powerful search capabilities and intelligent filtering options.
                </p>
                
              </div>

              <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Responsive Design</h3>
                <p className="text-gray-600 mb-4">
                  Access your tasks anywhere with our mobile-first design that works seamlessly across all devices.
                </p>
              
              </div>

              <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  Track your productivity with detailed analytics, progress reports, and performance insights.
                </p>
                
              </div>

              <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cloud Sync</h3>
                <p className="text-gray-600 mb-4">
                  Your tasks are automatically synchronized across all devices with real-time cloud backup.
                </p>
            
              </div>
            </div>
          </div>
        </div>

        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ready to boost your productivity?
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Join thousands of professionals who have transformed their workflow with TaskManager
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Save 3+ hours daily</h3>
                  <p className="text-gray-600">Streamline your workflow and focus on what matters most</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Achieve more goals</h3>
                  <p className="text-gray-600">Stay organized and track progress toward your objectives</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Boost productivity</h3>
                  <p className="text-gray-600">Optimize your daily routine with intelligent task management</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-white/30 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ListTodo className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">TaskManager</span>
              </div>
              <p className="text-gray-600 mb-8">
                The most intuitive task management platform for modern professionals
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
              </div>
              <p className="text-xs text-gray-400 mt-8">
                © 2025 TaskManager. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
