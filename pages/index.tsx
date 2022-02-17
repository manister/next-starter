import Head from 'next/head'
import Layout from '~/components/layout/Main'
import Container from '~/components/layout/Container'
import { useGlobalState } from '~/state/context'

const IndexComponent: React.FunctionComponent = () => {
  const { state } = useGlobalState()
  return (
    <Layout>
      <Head>
        <title>Chillies</title>
      </Head>
      <Container>
        <h1>Chillies</h1>
      </Container>
    </Layout>
  )
}
export default IndexComponent
