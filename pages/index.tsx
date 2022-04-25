import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import Container from '~/components/layout/Container'
import LinkTo from '~/components/global/LinkTo'
import { useGlobalState } from '~/state/context'

const IndexComponent: React.FunctionComponent = () => {
  const { state, actions } = useGlobalState()
  return (
    <Layout>
      <Head>
        <title>Chillies</title>
      </Head>
      <Container>
        <input
          type="number"
          value={state.count}
          onChange={(e) => {
            const newCount = parseInt(e.target.value)
            actions.setCount(newCount)
          }}
        ></input>
        <LinkTo href="/chillies">Chillies</LinkTo>
      </Container>
    </Layout>
  )
}

export default IndexComponent
