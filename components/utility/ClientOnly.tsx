import dynamic from 'next/dynamic'

type Props = {
  children: React.ReactNode
}

const Comp: React.FunctionComponent<Props> = ({ children }) => <>{children}</>
const ClientOnly = dynamic(() => Promise.resolve(Comp), {
  ssr: false,
})
export default ClientOnly
