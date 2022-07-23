import { AppWrapper } from '~/state/context'

import { AppProps } from 'next/app'
import '~/css/tailwind.css'

const Application = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default Application
