import Container from './Container'
import { useGlobalState } from '~/state/context'

const Layout: React.FunctionComponent = ({ children }) => {
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
