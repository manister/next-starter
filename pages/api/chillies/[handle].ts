import type { NextApiRequest, NextApiResponse } from 'next'
import { getChilliesFromAirtable } from '~/lib/airtable'

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { handle } = req.query
  getChilliesFromAirtable().then((chilliData) => {
    const found = handle && typeof handle === 'string' ? chilliData.find((chilli) => chilli.handle === handle) : null
    if (found) {
      res.status(200).json(found)
    } else {
      res.status(404).send('')
    }
  })
}

export default handler
