import dynamic from 'next/dynamic'

const Comp: React.FunctionComponent = ({ children }) => <>{children}</>
const ClientOnly = dynamic(() => Promise.resolve(Comp), {
  ssr: false,
})
export default ClientOnly
