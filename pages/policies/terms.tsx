/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Container from '~/components/layout/Container'
import Layout from '~/components/layout/Layout'

const Page: React.FunctionComponent = () => (
  <Layout>
    <Head>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
    <Container className="py-10">
      <div className="prose mx-auto">
        <h1>Terms of Service</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, cum iusto quaerat beatae repellendus delectus quia harum
          cumque necessitatibus. Molestiae quod ullam quasi sed libero nemo delectus commodi, laudantium rerum.
        </p>
      </div>
    </Container>
  </Layout>
)
export default Page
