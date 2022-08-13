import Emoji from '../global/Emoji'
import LinkTo from '../global/LinkTo'

import Container from '../layout/Container'
import Logo from './Logo'

interface INavLink {
  emoji: string
  text: string
  href: string
  id: string
}

const navLinks: INavLink[] = [
  {
    emoji: '🫑',
    text: 'Cultivars',
    href: '/chillies',
    id: 'chillies',
  },
  // {
  //   emoji: '📖',
  //   text: 'About',
  //   href: '/guides',
  //   id: 'guides',
  // },
]

const Nav = (): JSX.Element => (
  <nav className="bg-slate-100 py-3 sticky top-0 z-10 border-b-2">
    <Container className="flex justify-between items-center">
      <LinkTo className="block" href="/">
        <Logo />
      </LinkTo>
      <ul className="flex items-center">
        {navLinks.map((link) => (
          <li className="px-2" key={link.id}>
            <LinkTo className="font-semibold text-slate-900 hover:underline" href={link.href}>
              <Emoji src={link.emoji} /> {link.text}
            </LinkTo>
          </li>
        ))}
      </ul>
    </Container>
  </nav>
)
export default Nav
