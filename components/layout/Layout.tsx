import { useEffect } from 'react'
import { useGlobalState } from '~/state/context'
import Container from './Container'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
  const { state, actions } = useGlobalState()

  useEffect(() => {
    //on first load
    let wishlistArr = []
    try {
      wishlistArr = JSON.parse(localStorage.getItem('wishlist') ?? '[]') as string[]
      actions.hydrate(wishlistArr)
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    //when the wishlist updates, store it
    const wishlistJSON = JSON.stringify([...state.wishlist])
    localStorage.setItem('wishlist', wishlistJSON)
  }, [state])
  return (
    <div className="text-gray-900 antialiased">
      <Container>
        <main>{children}</main>
      </Container>
    </div>
  )
}

export default Layout
