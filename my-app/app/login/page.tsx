'use client';

import { useState } from "react";
import { login } from "../services/apiService";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const user = await login(email, password);
      console.log('Logged in user:', user);
      router.push('/')
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
            <img 
              src="https://i.pinimg.com/736x/76/31/8c/76318cbaebf3351de4065e6f831413f2.jpg" 
              alt="Login illustration" 
              className="w-64 h-auto transform hover:scale-105 transition duration-300"
            />
          </div>
          
          {/* Form Section */}
          <div className="md:w-1/2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Member Login
              </h2>

              {/* Email Input */}
              <div className="relative">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </span>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                </span>
              </div>

              {/* Login Button */}
              <div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </div>
                {error && <p className="text-red-500">{error}</p>}

              {/* Forgot Password Link */}
              <div className="text-center text-sm">
                <span className="text-gray-600">Forgot</span>
                <a href="\forget" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
                  Username / Password?
                </a>
              </div>

              {/* Create Account Link */}
              <div className="text-center text-sm pt-8">
                <a href="\register" className="font-medium text-blue-600 hover:text-blue-500">
                  Create your Account
                  <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}