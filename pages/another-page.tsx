import Head from 'next/head'
import Layout from '~/components/layout/Main'
import Container from '~/components/layout/Container'
import LinkTo from '~/components/global/LinkTo'

const IndexComponent: React.FunctionComponent = () => (
  <Layout>
    <Head>
      <title>Another page</title>
    </Head>
    <Container>
      <h1>another page</h1>
      <br />
      <LinkTo href="/">back to home page</LinkTo>
    </Container>
  </Layout>
)
export default IndexComponent
