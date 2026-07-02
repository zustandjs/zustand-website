import { defineConfig } from '@rspress/core'
import { transformerCompatibleMetaHighlight } from '@rspress/core/shiki-transformers'
import { pluginPreview } from '@rspress/plugin-preview'
import { pluginPlayground } from '@rspress/plugin-playground'

export default defineConfig({
  llms: true,
  markdown: {
    shiki: {
      transformers: [transformerCompatibleMetaHighlight()],
    },
    link: {
      checkDeadLinks: true,
      checkAnchors: true,
    },
  },
  plugins: [pluginPreview(), pluginPlayground()],
  root: 'docs',
  title: 'Zustand Docs',
  description: 'A multilingual Rspress documentation site.',
  lang: 'en',
  icon: '/favicon.ico',
  logo: '/favicon.ico',
  logoText: 'Zustand',
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'Zustand Docs',
      description: 'A multilingual Rspress documentation site.',
    },
  ],
  themeConfig: {
    editLink: {
      docRepoBaseUrl: 'https://github.com/zustandjs/zustand-website/tree/main/docs',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/pmndrs/zustand',
      },
      {
        icon: 'npm',
        mode: 'link',
        content: 'https://www.npmjs.com/package/zustand',
      },
    ],
  },
})
