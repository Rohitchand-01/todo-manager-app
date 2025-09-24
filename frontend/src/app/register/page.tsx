'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Check, X } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { register } = useAuth();
  const router = useRouter();

  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    Object.values(checks).forEach(check => check && score++);

    if (score === 0) return { strength: 'none', color: 'bg-gray-200', width: '0%', text: '' };
    if (score <= 2) return { strength: 'weak', color: 'bg-red-400', width: '25%', text: 'Weak' };
    if (score <= 3) return { strength: 'fair', color: 'bg-yellow-400', width: '50%', text: 'Fair' };
    if (score <= 4) return { strength: 'good', color: 'bg-blue-400', width: '75%', text: 'Good' };
    return { strength: 'strong', color: 'bg-green-400', width: '100%', text: 'Strong' };
  };

  const passwordStrength = getPasswordStrength(password);

  const passwordRequirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'One lowercase letter', met: /[a-z]/.test(password) },
    { text: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'One number', met: /\d/.test(password) },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (name.length < 2) {
      setError('Name must be at least 2 characters');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await register(name, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="absolute top-20 right-20 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6 transform transition-all duration-500">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 transform -rotate-3 hover:rotate-3 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Join TaskManager
            </h1>
            <p className="text-gray-500 text-sm">
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-in slide-in-from-left duration-300">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={`w-full px-4 py-3 bg-gray-50/50 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                      focusedField === 'name' 
                        ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`w-full px-4 py-3 bg-gray-50/50 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                      focusedField === 'email' 
                        ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className={`w-full px-4 py-3 pr-12 bg-gray-50/50 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:bg-white ${
                      focusedField === 'password' 
                        ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {password && (
                  <div className="space-y-2 animate-in slide-in-from-top duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600">Password strength</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength.strength === 'weak' ? 'text-red-500' :
                        passwordStrength.strength === 'fair' ? 'text-yellow-500' :
                        passwordStrength.strength === 'good' ? 'text-blue-500' :
                        passwordStrength.strength === 'strong' ? 'text-green-500' :
                        'text-gray-400'
                      }`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-1.5 transition-all duration-500 rounded-full ${passwordStrength.color}`}
                        style={{ width: passwordStrength.width }}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {req.met ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-gray-400" />
                          )}
                          <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <Link 
              href="/login" 
              className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2 group"
            >
              Sign in instead
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
