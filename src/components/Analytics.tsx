'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import analytics from '@/lib/analytics'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize analytics on first load
    console.log('Analytics: Initializing page tracking for:', pathname)

    // Track page views
    analytics.page({
      url: window.location.href,
      path: pathname,
      title: document.title
    })

  }, [pathname])

  return null
}
