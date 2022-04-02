import { GetStaticProps } from 'next'
import JsonView from '~/components/utility/JsonView'
import { getChilliesFromAirtable } from '~/lib/airtable'

interface Props {
  data: Record<string, unknown>
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getChilliesFromAirtable()
  return {
    props: { data },
  }
}

const ChilliPage: React.FunctionComponent<Props> = ({ data }) => {
  return <JsonView src={data} />
}

export default ChilliPage
