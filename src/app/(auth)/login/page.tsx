'use client';

import { Card, CardBody, CardHeader, Button, Input } from '@heroui/react';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!result?.ok) {
      console.error('Login failed:', result.error);
    } else {
      console.log('Login successful:', result);
      router.push('/admin'); // Redirect to admin dashboard on successful login
      // Redirect or perform further actions on successful login
    }
  };

  return (
    <div className="min-h-screen bg-white border-16 border-green-600" style={{ borderWidth: '16px' }}>
      {/* Header */}
      <div className="bg-white border-b-8 border-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="light" startContent={<ArrowLeftIcon className="w-5 h-5" />} className="text-green-800 hover:bg-green-100 font-bold border-2 border-green-600">
                BACK TO HOME
              </Button>
            </Link>
            <h1
              className="text-2xl sm:text-3xl font-black text-yellow-300 text-center flex-1 drop-shadow-lg"
              style={{ textShadow: '2px 2px 0px #dc2626, -1px -1px 0px #dc2626, 1px -1px 0px #dc2626, -1px 1px 0px #dc2626' }}
            >
              LOGIN
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Coffee Bean Background Decorations */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Coffee Bean 1 - Top Left */}
        <div className="absolute top-16 left-12 opacity-15 transform rotate-45 scale-75">
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="20" cy="30" rx="18" ry="28" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            <path d="M20 8 Q20 30 20 52" stroke="#654321" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Coffee Bean 2 - Top Right */}
        <div className="absolute top-20 right-16 opacity-12 transform -rotate-30 scale-80">
          <svg width="35" height="55" viewBox="0 0 35 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="17.5" cy="27.5" rx="16" ry="26" fill="#CD853F" stroke="#8B4513" strokeWidth="2" />
            <path d="M17.5 6 Q17.5 27.5 17.5 49" stroke="#8B4513" strokeWidth="2.5" fill="none" />
          </svg>
        </div>

        {/* Coffee Bean 3 - Bottom Left */}
        <div className="absolute bottom-20 left-20 opacity-18 transform rotate-60 scale-70">
          <svg width="38" height="58" viewBox="0 0 38 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="19" cy="29" rx="17" ry="27" fill="#A0522D" stroke="#654321" strokeWidth="2" />
            <path d="M19 7 Q19 29 19 51" stroke="#654321" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Coffee Bean 4 - Bottom Right */}
        <div className="absolute bottom-24 right-24 opacity-14 transform -rotate-15 scale-85">
          <svg width="42" height="62" viewBox="0 0 42 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="21" cy="31" rx="19" ry="29" fill="#D2691E" stroke="#A0522D" strokeWidth="2" />
            <path d="M21 8 Q21 31 21 54" stroke="#A0522D" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Small Coffee Beans */}
        <div className="absolute top-1/3 left-1/4 opacity-20 transform rotate-90 scale-50">
          <div className="w-4 h-6 bg-amber-800 rounded-full border border-amber-900"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-16 transform -rotate-45 scale-45">
          <div className="w-3 h-5 bg-amber-900 rounded-full border border-amber-800"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Brand Section */}
          <div className="text-center mb-8">
            <h2
              className="text-3xl sm:text-4xl font-black text-yellow-300 mb-4 drop-shadow-lg"
              style={{ textShadow: '3px 3px 0px #dc2626, -1px -1px 0px #dc2626, 1px -1px 0px #dc2626, -1px 1px 0px #dc2626' }}
            >
              SENJA DI MENTARI
            </h2>
            <p className="text-lg text-green-800 font-bold">Welcome back to our coffee family!</p>
          </div>

          {/* Login Form Card */}
          <Card className="shadow-2xl bg-white border-8 border-green-600">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-green-400 to-green-500">
              <div className="w-full">
                <div className="flex items-center justify-center mb-4">
                  <UserIcon className="w-8 h-8 text-white mr-3" />
                  <h3 className="text-2xl font-black text-white drop-shadow-md">ADMIN LOGIN</h3>
                </div>
                <p className="text-white font-bold drop-shadow-sm">Enter your credentials to access the admin panel</p>
              </div>
            </CardHeader>

            <CardBody className="bg-green-50 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startContent={<UserIcon className="w-5 h-5 text-green-600" />}
                    variant="bordered"
                    size="lg"
                    isRequired
                    classNames={{
                      input: 'text-green-800 font-semibold',
                      inputWrapper: 'border-4 border-green-600 hover:border-yellow-400 focus-within:border-red-600',
                      label: 'text-green-800 font-bold',
                    }}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <Input
                    type={isVisible ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startContent={<LockClosedIcon className="w-5 h-5 text-green-600" />}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? <EyeSlashIcon className="w-5 h-5 text-green-600" /> : <EyeIcon className="w-5 h-5 text-green-600" />}
                      </button>
                    }
                    variant="bordered"
                    size="lg"
                    isRequired
                    classNames={{
                      input: 'text-green-800 font-semibold',
                      inputWrapper: 'border-4 border-green-600 hover:border-yellow-400 focus-within:border-red-600',
                      label: 'text-green-800 font-bold',
                    }}
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-green-600 text-red-600 focus:ring-red-500 focus:ring-2 w-4 h-4" />
                    <span className="ml-2 text-sm text-green-800 font-semibold">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-500 font-bold">
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-red-600 text-white font-black hover:bg-red-500 border-4 border-yellow-400 shadow-xl text-lg py-6 transform hover:scale-105 transition-all duration-300"
                >
                  LOGIN TO ADMIN PANEL
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-4 border-4 border-yellow-400">
              <p className="text-sm text-green-800 font-bold">🔒 Secure admin access for managing coffee shop operations</p>
              <p className="text-xs text-green-700 mt-1">Need admin access? Contact the coffee shop manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
