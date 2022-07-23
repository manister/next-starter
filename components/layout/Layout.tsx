import Container from './Container'
import { useGlobalState } from '~/state/context'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
  const { state } = useGlobalState()
  const { count } = state
  return (
    <div className="text-gray-900 antialiased">
      <Container>
        <span>The count is {count}</span>
        <main>{children}</main>
      </Container>
    </div>
  )
}

export default Layout
