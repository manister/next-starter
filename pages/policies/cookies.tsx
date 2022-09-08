import Head from 'next/head'
import CookieConsent from 'react-cookie-consent'
import Container from '~/components/layout/Container'

import Layout from '~/components/layout/Layout'

const Page: React.FunctionComponent = () => (
  <Layout showCookieConsent={false}>
    <Head>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
    <CookieConsent buttonText="Accept all and close" flipButtons enableDeclineButton declineButtonText="Reject non-essential">
      Please read our cookie policy and accept or reject the use of non-essential cookies.
    </CookieConsent>
    <Container className="py-10">
      <div className="prose mx-auto">
        <h1>Cookie Policy</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, cum iusto quaerat beatae repellendus delectus quia harum
          cumque necessitatibus. Molestiae quod ullam quasi sed libero nemo delectus commodi, laudantium rerum.
        </p>
      </div>
    </Container>
  </Layout>
)
export default Page
