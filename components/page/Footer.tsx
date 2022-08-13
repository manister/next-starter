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
    emoji: '🕵️‍♀️',
    text: 'Privacy',
    href: '/policies/privacy',
    id: 'privacy',
  },
  {
    emoji: '📜',
    text: 'Terms',
    href: '/policies/terms',
    id: 'privacy',
  },
  {
    emoji: '🍪',
    text: 'Cookies',
    href: '/policies/cookies',
    id: 'cookies',
  },
  // {
  //   emoji: '📖',
  //   text: 'About',
  //   href: '/guides',
  //   id: 'guides',
  // },
]

const Footer = (): JSX.Element => (
  <footer className="bg-slate-50 py-2">
    <Container className="flex justify-end items-center">
      <p className="text-xs">&copy; copyright pepper.town, unless otherwise noted, 2022 | </p>
      <ul className="flex items-center">
        {navLinks.map((link) => (
          <li className="px-2" key={link.id}>
            <LinkTo className="text-xs text-slate-900 hover:underline" href={link.href}>
              <Emoji src={link.emoji} /> {link.text}
            </LinkTo>
          </li>
        ))}
      </ul>
    </Container>
  </footer>
)
export default Footer
