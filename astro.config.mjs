// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://plexapi.dev',
  integrations: [
    starlight({
      title: 'PlexAPI.dev',
      description: 'Developer guides and reference documentation for the Plex Media Server API ecosystem.',
      favicon: '/plexapi-logo.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/plexapi-dev/docs' },
      ],
      editLink: {
        baseUrl: 'https://github.com/plexapi-dev/docs/edit/main/src/content/docs/',
      },
      lastUpdated: true,
      sidebar: [
        {
          label: 'Guides',
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
        {
          label: 'SDKs',
          items: [{ autogenerate: { directory: 'sdks' } }],
        },
        {
          label: 'Design',
          items: [{ autogenerate: { directory: 'design' } }],
        },
        {
          label: 'Contributing',
          link: '/contributing',
        },
      ],
    }),
  ],
});
