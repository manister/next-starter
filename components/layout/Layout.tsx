import CookieConsent from 'react-cookie-consent'
import Footer from '../page/Footer'
import Nav from '../page/Nav'
import ClientOnly from '../utility/ClientOnly'
import Container from './Container'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="text-gray-900 antialiased">
      <Nav />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
      <ClientOnly>
        <CookieConsent declineButtonText="Accept essential only" buttonText="Accept all" enableDeclineButton>
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </ClientOnly>
    </div>
  )
}

export default Layout
