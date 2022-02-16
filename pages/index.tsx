import Head from 'next/head'
import Layout from '~/components/layout/Main'
import Container from '~/components/layout/Container'
import { useGlobalState } from '~/state/context'
import LinkTo from '~/components/global/LinkTo'

const IndexComponent: React.FunctionComponent = () => {
  const { state, actions } = useGlobalState()
  const { count } = state
  return (
    <Layout>
      <Head>
        <title>Hello World</title>
      </Head>
      <Container>
        <h1>Hello World</h1>
        <br />
        <LinkTo href="/another-page">another page</LinkTo>
        <br />
        <input
          type="number"
          value={count}
          onChange={(e) => {
            const newCount = parseInt(e.target.value)
            actions.setCount(newCount)
          }}
        ></input>
      </Container>
    </Layout>
  )
}
export default IndexComponent
