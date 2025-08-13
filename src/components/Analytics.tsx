'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import analytics from '@/lib/analytics'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views
    analytics.page({
      url: window.location.href,
      path: pathname,
      title: document.title
    })

  }, [pathname])

  return null
}
