import { AppWrapper } from '~/state/context'

import { AppProps } from 'next/app'
import '~/css/tailwind.css'

const Application: React.FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default Application
