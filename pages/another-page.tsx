import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/components/layout/main'
import Container from '~/components/layout/container'

const IndexComponent: React.FunctionComponent = () => (
  <Layout>
    <Head>
      <title>Another page</title>
    </Head>
    <Container>
      <h1>another page</h1>
      <br />
      <Link passHref href="/">
        <a>back to home page</a>
      </Link>
    </Container>
  </Layout>
)
export default IndexComponent
