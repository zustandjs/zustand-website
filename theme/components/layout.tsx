import { Content, usePage } from '@rspress/core/runtime'
import type { HomeLayoutProps } from '@rspress/core/theme'
import {
  HomeLayout,
  NotFoundLayout,
  DocLayout,
  type DocLayoutProps,
  Nav,
  type NavProps,
  useRedirect4FirstVisit,
  useScrollReset,
  useSetup,
} from '@rspress/core/theme'

export function Layout() {
  const { page } = usePage()
  const homeProps = {}
  const docProps = {}
  const navTitle = ''

  const getContentLayout = (pageType: string) => {
    switch (pageType) {
      case 'home':
        return <HomeLayout {...homeProps} />
      case 'doc':
      case 'doc-wide':
        return <DocLayout {...docProps} navTitle={navTitle} />
      case '404':
        return <NotFoundLayout />
      // The custom pageType will have navbar while the blank pageType will not.
      case 'custom':
      case 'blank':
        return <Content />
      default:
        return <DocLayout {...docProps} />
    }
  }

  return <div>{getContentLayout(page.pageType)}</div>
}
