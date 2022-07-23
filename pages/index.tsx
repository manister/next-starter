import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import Container from '~/components/layout/Container'
import LinkTo from '~/components/global/LinkTo'

const IndexComponent = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>Chillies</title>
      </Head>
      <Container>
        <LinkTo href="/chillies">Chillies</LinkTo>
      </Container>
    </Layout>
  )
}

export default IndexComponent
