import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PlexAPI.dev",
  description: "Developer documentation for the Plex Media Server API ecosystem.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/guide/' },
      { text: 'Reference', link: '/reference/' }
    ],

    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Authentication', link: '/guide/authentication' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Overview', link: '/reference/' },
          { text: 'Endpoints', link: '/reference/endpoints' },
          { text: 'Server', link: '/reference/server' },
          { text: 'Library', link: '/reference/library' },
          { text: 'Sessions', link: '/reference/sessions' }
        ]
      },
      {
        text: 'Design',
        items: [
          { text: 'API Contract', link: '/design/api-contract' },
          { text: 'SDK Generation Strategy', link: '/design/sdk-generation-strategy' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/plexapi-dev' }
    ]
  }
})
