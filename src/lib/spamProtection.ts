// Spam protection utilities for forms

export interface SpamCheckResult {
  isValid: boolean;
  error?: string;
}

export interface FormData {
  email?: string;
  message?: string;
  [key: string]: string | undefined;
}

// Common spam email patterns
const SPAM_EMAIL_PATTERNS = [
  'test@test.com',
  'admin@',
  'noreply@',
  'no-reply@',
  'mailinator.com',
  '10minutemail.com',
  'guerrillamail.com',
  'tempmail.com',
  'throwaway.com',
  'spam.com',
  'fake.com'
];

// Common spam words/phrases
const SPAM_WORDS = [
  'viagra',
  'casino',
  'loan',
  'credit',
  'debt',
  'weight loss',
  'make money',
  'earn money',
  'work from home',
  'get rich',
  'investment',
  'bitcoin',
  'crypto',
  'forex',
  'trading',
  'pharmacy',
  'medication',
  'prescription',
  'buy now',
  'limited time',
  'act now',
  'click here',
  'free trial',
  'guaranteed',
  '100% free',
  'no cost',
  'no obligation'
];

/**
 * Check if an email is valid and not spam
 */
export function validateEmail(email: string): SpamCheckResult {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address.'
    };
  }

  // Check for spam patterns
  const isSpamEmail = SPAM_EMAIL_PATTERNS.some(pattern =>
    email.toLowerCase().includes(pattern)
  );

  if (isSpamEmail) {
    return {
      isValid: false,
      error: 'Please use a valid email address.'
    };
  }

  return { isValid: true };
}

/**
 * Check message content for spam indicators
 */
export function validateMessage(message: string, minLength = 10, maxLength = 2000): SpamCheckResult {
  // Check length
  if (message.length < minLength) {
    return {
      isValid: false,
      error: `Message must be at least ${minLength} characters long.`
    };
  }

  if (message.length > maxLength) {
    return {
      isValid: false,
      error: `Message must be no more than ${maxLength} characters long.`
    };
  }

  // Check for spam words
  const messageLower = message.toLowerCase();
  const foundSpamWords = SPAM_WORDS.filter(word => messageLower.includes(word));

  if (foundSpamWords.length > 0) {
    return {
      isValid: false,
      error: 'Your message contains content that appears to be spam. Please revise and try again.'
    };
  }

  return { isValid: true };
}

/**
 * Check rate limiting
 */
export function validateRateLimit(lastSubmission: number, cooldownMs = 5000): SpamCheckResult {
  // Only run on client side to avoid hydration mismatch
  if (typeof window === 'undefined') {
    return { isValid: true };
  }
  
  const now = Date.now();
  if (now - lastSubmission < cooldownMs) {
    return {
      isValid: false,
      error: 'Please wait a moment before trying again.'
    };
  }
  return { isValid: true };
}

/**
 * Comprehensive spam check for forms
 */
export function performSpamCheck(data: {
  email?: string;
  message?: string;
  honeypot?: string;
  lastSubmission: number;
  cooldownMs?: number;
}): SpamCheckResult {
  // Check rate limiting
  const rateLimitCheck = validateRateLimit(data.lastSubmission, data.cooldownMs);
  if (!rateLimitCheck.isValid) {
    return rateLimitCheck;
  }

  // Check email if provided
  if (data.email) {
    const emailCheck = validateEmail(data.email);
    if (!emailCheck.isValid) {
      return emailCheck;
    }
  }

  // Check message if provided
  if (data.message) {
    const messageCheck = validateMessage(data.message);
    if (!messageCheck.isValid) {
      return messageCheck;
    }
  }

  return { isValid: true };
}
