import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/components/layout/main'
import Container from '~/components/layout/container'
import { useGlobalState } from '~/state/context'

const IndexComponent: React.FunctionComponent = () => {
  const { state, dispatch } = useGlobalState()
  const { count } = state
  return (
    <Layout>
      <Head>
        <title>Hello World</title>
      </Head>
      <Container>
        <h1>Hello World</h1>
        <br />
        <Link passHref href="/another-page">
          <a>another page</a>
        </Link>
        <br />
        <input
          type="number"
          value={count}
          onChange={(e) => {
            const newCount = parseInt(e.target.value)
            dispatch({ type: 'SET_COUNT', payload: newCount })
          }}
        ></input>
      </Container>
    </Layout>
  )
}
export default IndexComponent
