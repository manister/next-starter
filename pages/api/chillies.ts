import type { NextApiRequest, NextApiResponse } from 'next'
import { getChilliesFromAirtable } from '~/lib/airtable'

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  getChilliesFromAirtable().then((chillies) => {
    res.status(200).json(chillies)
    console.log(chillies)
  })
}

export default handler
