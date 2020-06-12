import App, { AppInitialProps } from 'next/app'
import 'typeface-lato'
import '~/css/tailwind.css'

import wrapper from '~/store/store'

class WrappedApp extends App<AppInitialProps> {
  public render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default wrapper.withRedux(WrappedApp)
