"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { performSpamCheck } from "@/lib/spamProtection";
import VideoBackground from "@/components/VideoBackground";

function ContactUsForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    inquiryType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [lastSubmission, setLastSubmission] = useState(0);

  // Auto-select user submission option if URL parameter is present
  useEffect(() => {
    const inquiryParam = searchParams.get('inquiry');
    if (inquiryParam === 'user-submission') {
      setFormData(prev => ({
        ...prev,
        inquiryType: 'user-submission'
      }));
    }
  }, [searchParams]);

  const inquiryTypes = [
    { value: "", label: "Select an inquiry type" },
    {
      value: "user-submission",
      label: "User Submission: equipment review, course write-up, or article",
      email: "george@birdiebriefing.com",
    },
    {
      value: "general",
      label: "General Inquiries",
      email: "hello@birdiebriefing.com",
    },
    {
      value: "advertising",
      label: "Advertising",
      email: "marketing@birdiebriefing.com",
    },
    { value: "press", label: "Press", email: "press@birdiebriefing.com" },
    {
      value: "event-coverage",
      label: "Event Coverage",
      email: "coverage@birdiebriefing.com",
    },
    {
      value: "partnerships",
      label: "Partnerships",
      email: "partners@birdiebriefing.com",
    },
    {
      value: "equipment",
      label: "Equipment",
      email: "equipment@birdiebriefing.com",
    },
    {
      value: "complaints",
      label: "Complaints",
      email: "care@birdiebriefing.com",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Only run on client side
    if (typeof window === 'undefined') return;

    // Perform comprehensive spam check
    const spamCheck = performSpamCheck({
      email: formData.email,
      message: formData.message,
      lastSubmission,
      cooldownMs: 10000,
    });

    if (!spamCheck.isValid) {
      setError(spamCheck.error || "Invalid submission.");
      setIsSubmitting(false);
      return;
    }

    setLastSubmission(Date.now());

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get the target email and generate subject based on inquiry type
      // const selectedInquiry = inquiryTypes.find(
      //   (type) => type.value === formData.inquiryType
      // );

      // Here you would typically send to your backend API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     subject,
      //     targetEmail,
      //     inquiryTypeLabel: selectedInquiry?.label || 'General Inquiries'
      //   })
      // });

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        inquiryType: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-white'>
      {/* Masthead Section - Matching Homepage and Podcast */}
      <section className='relative overflow-hidden'>
        {/* Video Background */}
        <VideoBackground />

        {/* Content Overlay */}
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12'>
          <div className='max-w-6xl mx-auto'>
            {/* Text Content with White Background */}
            <div className='bg-white rounded-lg p-6 lg:p-8'>
              {/* Main Headlines */}
              <div className='text-center mb-6'>
                <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                  <span className='text-primary-500'>Contact</span>{" "}
                  <span className='text-secondary-500'>Us</span>
                </h1>
              </div>

              {/* Introduction */}
              <div className='max-w-3xl mx-auto text-center mb-8'>
                <p className='text-base lg:text-lg text-gray-700 leading-relaxed mb-6'>
                  Be part of the community! Share your take with a gear review, course write-up, or even an article. Fans, media partners, brands, and makers--we'd love to hear from you.
                </p>
              </div>

              {/* Contact Form */}
              <div className='max-w-2xl mx-auto'>
                <form onSubmit={handleSubmit} className='space-y-5'>
                  {/* Name Fields */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                      <label
                        htmlFor='firstName'
                        className='block text-sm font-semibold text-gray-900 mb-2'
                      >
                        First Name *
                      </label>
                                             <input
                         type='text'
                         id='firstName'
                         name='firstName'
                         value={formData.firstName}
                         onChange={handleInputChange}
                         required
                         className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200'
                         placeholder='Enter your first name'
                       />
                    </div>
                    <div>
                      <label
                        htmlFor='lastName'
                        className='block text-sm font-semibold text-gray-900 mb-2'
                      >
                        Last Name *
                      </label>
                                             <input
                         type='text'
                         id='lastName'
                         name='lastName'
                         value={formData.lastName}
                         onChange={handleInputChange}
                         required
                         className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200'
                         placeholder='Enter your last name'
                       />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-semibold text-gray-900 mb-2'
                    >
                      Email Address *
                    </label>
                                         <input
                       type='email'
                       id='email'
                       name='email'
                       value={formData.email}
                       onChange={handleInputChange}
                       required
                       className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200'
                       placeholder='Enter your email address'
                     />
                  </div>

                  {/* Inquiry Type Dropdown */}
                  <div>
                    <label
                      htmlFor='inquiryType'
                      className='block text-sm font-semibold text-gray-900 mb-2'
                    >
                      Inquiry Type *
                    </label>
                                         <select
                       id='inquiryType'
                       name='inquiryType'
                       value={formData.inquiryType}
                       onChange={handleInputChange}
                       required
                       className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200'
                     >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-semibold text-gray-900 mb-2'
                    >
                      Message *
                    </label>
                                         <textarea
                       id='message'
                       name='message'
                       value={formData.message}
                       onChange={handleInputChange}
                       required
                       rows={5}
                       className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none'
                       placeholder='Enter your message here...'
                     />
                    <p className='text-xs text-gray-500 mt-1'>
                      {formData.message.length}/2000 characters
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 text-red-500 mr-2'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <p className='text-red-800 font-medium text-sm'>
                          {error}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className='pt-2'>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-base'
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className='bg-green-50 border border-green-200 rounded-lg p-3'>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 text-green-500 mr-2'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <p className='text-green-800 font-medium text-sm'>
                          Message sent successfully! We'll get back to you soon.
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                      <div className='flex items-center'>
                        <svg
                          className='w-4 h-4 text-red-500 mr-2'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <p className='text-red-800 font-medium text-sm'>
                          There was an error sending your message. Please try
                          again.
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactUsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactUsForm />
    </Suspense>
  );
}
