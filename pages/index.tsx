import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Layout from '~/components/layout/main'
import Container from '~/components/layout/container'
import { State } from '~/store/state'

const IndexComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const isToggled = useSelector((state: State) => state.someToggle)
  return (
    <Layout>
      <Head>
        <title>Hello World</title>
      </Head>
      <Container>
        <h1>Hello World</h1>
        <br />
        <Link href="/another-page"><span>another page</span></Link>
        <br />
        <button onClick={() => dispatch({ type: 'TOGGLE' })} type="button">
          {isToggled ? 'click me again' : 'click me'}
        </button>
      </Container>

    </Layout>
  )
}
export default IndexComponent
