'use client';

import { useState } from 'react';
import { performSpamCheck } from '@/lib/spamProtection';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastSubmission, setLastSubmission] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Only run on client side
    if (typeof window === 'undefined') return;

    // Perform comprehensive spam check
    const spamCheck = performSpamCheck({
      email,
      lastSubmission,
      cooldownMs: 5000
    });

    if (!spamCheck.isValid) {
      setError(spamCheck.error || 'Invalid submission.');
      return;
    }

    setIsLoading(true);
    setLastSubmission(Date.now());

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Here you would typically send to your backend API
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      setIsSubscribed(true);
      setEmail('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 text-center">
        <div className="w-12 h-12 bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-green-400 mb-1">Welcome to The Birdie Briefing!</h3>
        <p className="text-green-300 text-sm">
          You&apos;ve been successfully subscribed to our newsletter.
        </p>
      </div>
    );
  }

  return (
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
          className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm"
          placeholder="Enter your email address"
        />
      </div>

      {error && (
        <p className="text-red-400 text-xs text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Subscribing...' : 'Subscribe Now'}
      </button>
      <p className="text-xs text-gray-400 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}
