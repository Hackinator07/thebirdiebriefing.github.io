'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import analytics from '@/lib/analytics'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Track page views
    analytics.page({
      url: window.location.href,
      path: pathname,
      title: document.title
    })

  }, [pathname])

  return null
}
