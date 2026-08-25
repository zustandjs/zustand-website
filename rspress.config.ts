import { defineConfig } from '@rspress/core'
import { transformerCompatibleMetaHighlight } from '@rspress/core/shiki-transformers'
import { pluginClientRedirects } from '@rspress/plugin-client-redirects'
import { pluginPlayground } from '@rspress/plugin-playground'
import { pluginPreview } from '@rspress/plugin-preview'

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
  plugins: [
    pluginPreview(),
    pluginPlayground(),
    pluginClientRedirects({
      redirects: [
        // getting-started/ → learn/getting-started/
        { from: '^/getting-started/introduction$', to: '/learn/getting-started/introduction' },
        { from: '^/getting-started/comparison$', to: '/learn/getting-started/comparison' },
        // guides/ → learn/guides/
        { from: '^/guides/advanced-typescript$', to: '/learn/guides/advanced-typescript' },
        {
          from: '^/guides/auto-generating-selectors$',
          to: '/learn/guides/auto-generating-selectors',
        },
        { from: '^/guides/beginner-typescript$', to: '/learn/guides/beginner-typescript' },
        {
          from: '^/guides/connect-to-state-with-url-hash$',
          to: '/learn/guides/connect-to-state-with-url-hash',
        },
        {
          from: '^/guides/event-handler-in-pre-react-18$',
          to: '/learn/guides/event-handler-in-pre-react-18',
        },
        { from: '^/guides/flux-inspired-practice$', to: '/learn/guides/flux-inspired-practice' },
        { from: '^/guides/how-to-reset-state$', to: '/learn/guides/how-to-reset-state' },
        {
          from: '^/guides/immutable-state-and-merging$',
          to: '/learn/guides/immutable-state-and-merging',
        },
        {
          from: '^/guides/initialize-state-with-props$',
          to: '/learn/guides/initialize-state-with-props',
        },
        { from: '^/guides/maps-and-sets-usage$', to: '/learn/guides/maps-and-sets-usage' },
        { from: '^/guides/nextjs$', to: '/learn/guides/nextjs' },
        {
          from: '^/guides/practice-with-no-store-actions$',
          to: '/learn/guides/practice-with-no-store-actions',
        },
        {
          from: '^/guides/prevent-rerenders-with-use-shallow$',
          to: '/learn/guides/prevent-rerenders-with-use-shallow',
        },
        { from: '^/guides/slices-pattern$', to: '/learn/guides/slices-pattern' },
        { from: '^/guides/ssr-and-hydration$', to: '/learn/guides/ssr-and-hydration' },
        { from: '^/guides/testing$', to: '/learn/guides/testing' },
        { from: '^/guides/tutorial-tic-tac-toe$', to: '/learn/guides/tutorial-tic-tac-toe' },
        { from: '^/guides/updating-state$', to: '/learn/guides/updating-state' },
        // apis/ → reference/apis/
        { from: '^/apis/create$', to: '/reference/apis/create' },
        { from: '^/apis/create-store$', to: '/reference/apis/create-store' },
        { from: '^/apis/create-with-equality-fn$', to: '/reference/apis/create-with-equality-fn' },
        { from: '^/apis/shallow$', to: '/reference/apis/shallow' },
        // hooks/ → reference/hooks/
        { from: '^/hooks/use-shallow$', to: '/reference/hooks/use-shallow' },
        { from: '^/hooks/use-store$', to: '/reference/hooks/use-store' },
        {
          from: '^/hooks/use-store-with-equality-fn$',
          to: '/reference/hooks/use-store-with-equality-fn',
        },
        // integrations/ → reference/integrations/
        {
          from: '^/integrations/immer-middleware$',
          to: '/reference/integrations/immer-middleware',
        },
        {
          from: '^/integrations/persisting-store-data$',
          to: '/reference/integrations/persisting-store-data',
        },
        {
          from: '^/integrations/third-party-libraries$',
          to: '/reference/integrations/third-party-libraries',
        },
        // middlewares/ → reference/middlewares/
        { from: '^/middlewares/combine$', to: '/reference/middlewares/combine' },
        { from: '^/middlewares/devtools$', to: '/reference/middlewares/devtools' },
        { from: '^/middlewares/immer$', to: '/reference/middlewares/immer' },
        { from: '^/middlewares/persist$', to: '/reference/middlewares/persist' },
        { from: '^/middlewares/redux$', to: '/reference/middlewares/redux' },
        {
          from: '^/middlewares/subscribe-with-selector$',
          to: '/reference/middlewares/subscribe-with-selector',
        },
        // migrations/ → reference/migrations/
        { from: '^/migrations/migrating-to-v4$', to: '/reference/migrations/migrating-to-v4' },
        { from: '^/migrations/migrating-to-v5$', to: '/reference/migrations/migrating-to-v5' },
        // previous-versions/ → reference/previous-versions/
        {
          from: '^/previous-versions/zustand-v3-create-context$',
          to: '/reference/previous-versions/zustand-v3-create-context',
        },
      ],
    }),
  ],
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
