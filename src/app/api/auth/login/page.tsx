"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'Key in .env';

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);


    if (!email || !password) {
      setError("Invalid credentials!");
      return;
    }
    setLoading(true);

    try {
      const users = await fetch('http://localhost:3001/users')
        .then((result) => {
          if (!result.ok) throw new Error('Failed to fetch users');
          return result.json();
        });

      const user = users.find((user: { email: string; password: string }) => user.email === email && user.password === password);

      if (user) {
        Cookies.set('jwt', user.id, { expires: 30 });
        router.push('/api/recipes/create'); 
      } else {
        setError("Invalid credentials!");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-transparent"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-transparent"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 text-secondry border border-secondry hover:text-customText bg-transpart hover:bg-secondry font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}