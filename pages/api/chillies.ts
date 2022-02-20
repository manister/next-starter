import type { NextApiRequest, NextApiResponse } from 'next'
import { IChilliData } from '~/lib/types'

const chilliData = require('../../_data/chillies-data.json') as IChilliData

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json(chilliData)
}

export default handler
