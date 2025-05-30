'use client';

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { loginApi } from "../services/apiService";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');  // clear error

    try {
      const { access_token, user } = await loginApi(email, password);

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      router.push('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Member Login
          </h2>

          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <button 
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="text-center text-sm">
            <span className="text-gray-600">Forgot</span>
            <a href="/forget" className="text-blue-600 hover:text-blue-500 ml-1">
              Username / Password?
            </a>
          </div>

          <div className="text-center text-sm pt-4">
            <a href="/register" className="text-blue-600 hover:text-blue-500">
              Create your Account →
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
