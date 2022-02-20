import type { NextApiRequest, NextApiResponse } from 'next'
import { IChilliData } from '~/lib/types'

const chilliData = require('../../../_data/chillies-data.json') as IChilliData

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { handle } = req.query
  if (handle && typeof handle === 'string' && chilliData[handle]) {
    res.status(200).json(chilliData[handle])
  } else {
    res.status(404)
  }
}

export default handler
