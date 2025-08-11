import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

export const analytics = Analytics({
  app: 'thebirdiebriefing',
  plugins: [
    googleAnalytics({
      measurementIds: ['G-2N3SDEMB86']
    })
  ]
})

export default analytics
