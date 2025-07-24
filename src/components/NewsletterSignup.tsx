'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Welcome to Golf Girl Gazette!</h3>
        <p className="text-green-700 leading-relaxed">
          You&apos;ve been successfully subscribed to our newsletter. Check your email for confirmation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white shadow-xl">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4">Let's Connect!</h3>
        <p className="text-gray-200 leading-relaxed mb-8">
          Get the latest LPGA news, tournament updates, and exclusive content delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary-500 text-lg"
              placeholder="Enter your email address"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </form>
        <p className="text-xs text-gray-300 mt-6 leading-relaxed">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
