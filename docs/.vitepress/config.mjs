import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'PlexAPI.dev',
  titleTemplate: ':title | PlexAPI.dev',
  description: 'Developer guides and reference documentation for the Plex Media Server API ecosystem.',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,

  // Ignore Paperclip-internal ticket links used in roadmap/design docs.
  // Real documentation links are still validated by the build.
  ignoreDeadLinks: [/^\/PLE\//],

  themeConfig: {
    logo: '/plexapi-logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'Design', link: '/design/api-contract' },
      { text: 'Contribute', link: '/contributing' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Authentication', link: '/guide/authentication' }
          ]
        }
      ],
      '/reference/': [
        {
          text: 'API Reference',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/reference/' },
            { text: 'Endpoints', link: '/reference/endpoints' },
            { text: 'Server', link: '/reference/server' },
            { text: 'Library', link: '/reference/library' },
            { text: 'Sessions', link: '/reference/sessions' }
          ]
        }
      ],
      '/design/': [
        {
          text: 'Design',
          collapsed: false,
          items: [
            { text: 'API Contract', link: '/design/api-contract' },
            { text: 'SDK Generation Strategy', link: '/design/sdk-generation-strategy' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/plexapi-dev/docs' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 PlexAPI.dev contributors'
    },

    editLink: {
      pattern: 'https://github.com/plexapi-dev/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: 'deep',
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    }
  }
})
