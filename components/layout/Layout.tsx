import Nav from '../page/Nav'
import Container from './Container'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="text-gray-900 antialiased">
      <Nav />
      <Container>
        <main>{children}</main>
      </Container>
    </div>
  )
}

export default Layout
