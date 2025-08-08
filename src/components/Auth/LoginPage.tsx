import React, { useState } from 'react';
import { Ship, Eye, EyeOff, Anchor } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../UI/ThemeToggle';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'password' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (step === 'email') {
        // Validate email exists
        const validEmails = ['admin@maritime.com', 'manager@maritime.com', 'dept@maritime.com', 'employee@maritime.com', 'vendor@maritime.com'];
        if (validEmails.includes(email)) {
          setStep('password');
        } else {
          throw new Error('Email not found');
        }
      } else if (step === 'password') {
        const result = await login(email, password);
        if (result.requiresOtp) {
          setStep('otp');
        }
      } else if (step === 'otp') {
        await login(email, password, otp);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Centralized Asset Tracking',
    'Real-time Vessel Status',
    'Compliance-ready Reports',
    'Automated Incident Management'
  ];

  const demoCredentials = [
    { email: 'admin@maritime.com', role: 'Administrator', password: 'admin123' },
    { email: 'manager@maritime.com', role: 'IT Manager', password: 'manager123' },
    { email: 'dept@maritime.com', role: 'Department Manager', password: 'dept123' },
    { email: 'employee@maritime.com', role: 'Employee', password: 'emp123' },
    { email: 'vendor@maritime.com', role: 'Vendor', password: 'vendor123' }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Desktop Only */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-navy via-navy/90 to-teal/20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1334602/pexels-photo-1334602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-coral to-teal rounded-xl flex items-center justify-center">
                <Ship className="w-7 h-7 text-white" />
              </div>
              <span className="ml-4 text-2xl font-bold">MarineIT</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Secure, Smart, Seamless<br />
              Marine IT Management
            </h1>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-coral rounded-full"></div>
                  <span className="text-lg opacity-90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm opacity-75">
            <Anchor className="w-4 h-4" />
            <span>Trusted by maritime professionals worldwide</span>
          </div>
        </div>
      </div>

      {/* Mobile Hero Image */}
      <div className="lg:hidden relative h-64 bg-gradient-to-br from-navy to-teal">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1334602/pexels-photo-1334602.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1)'
          }}
        ></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-coral to-white/20 rounded-xl flex items-center justify-center">
              <Ship className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold">MarineIT</span>
          </div>
          <p className="text-center text-lg opacity-90">Secure Maritime IT Management</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 lg:flex-none lg:w-96 bg-white dark:bg-gray-900 flex flex-col justify-center p-8 lg:p-12">
        <div className="absolute top-4 right-4 lg:top-8 lg:right-8">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-sm mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {step === 'email' && 'Welcome back'}
              {step === 'password' && 'Enter password'}
              {step === 'otp' && 'Verify your identity'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {step === 'email' && 'Enter your email to continue'}
              {step === 'password' && 'Enter your password to continue'}
              {step === 'otp' && 'Enter the 6-digit code sent to your device'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 'email' && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            )}

            {step === 'password' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="text-sm text-coral hover:text-coral/80 transition-colors"
                  >
                    Change email
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {step === 'otp' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Verification code
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('password')}
                    className="text-sm text-coral hover:text-coral/80 transition-colors"
                  >
                    Back
                  </button>
                </div>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent transition-all text-center tracking-widest text-lg font-mono"
                  placeholder="123456"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                  Use code: <span className="font-mono font-bold">123456</span> for demo
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-coral hover:bg-coral/90 disabled:bg-coral/50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-coral/50 focus:outline-none"
            >
              {loading ? 'Please wait...' : 
               step === 'email' ? 'Continue' : 
               step === 'password' ? 'Sign In' : 
               'Verify'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Demo Accounts:</p>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{cred.role}:</span>
                  <button
                    type="button"
                    onClick={() => setEmail(cred.email)}
                    className="text-coral hover:text-coral/80 transition-colors"
                  >
                    {cred.email}
                  </button>
                </div>
              ))}
              <p className="text-center mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                Password: <span className="font-mono">admin123</span> (or similar for each role)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}