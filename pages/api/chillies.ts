import type { NextApiRequest, NextApiResponse } from 'next'
import { IChilliData } from '~/lib/types'
import { importAll } from '~/lib/webpack-helpers'

const chilliData = importAll(require.context('../../_content/chillies', false, /\.md$/)) as IChilliData

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json(chilliData)
}

export default handler
