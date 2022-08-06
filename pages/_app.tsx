import { AppWrapper } from '~/state/context'

import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import '~/css/tailwind.css'

const Application = ({ Component, pageProps }: AppProps): JSX.Element => {
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default Application
