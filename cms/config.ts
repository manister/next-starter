import { NetlifyCmsConfig } from './types'

const config: NetlifyCmsConfig = {
  backend: {
    name: 'github',
    repo: 'manister/next-starter',
    branch: 'main',
  },
  media_folder: 'public/img',
  public_folder: 'img',
  collections: [
    {
      label: 'Chilli',
      name: 'chillis',
      folder: '_content/chillies',
      create: true,
      fields: [
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Featured Image',
          name: 'thumbnail',
          widget: 'image',
        },
        {
          label: 'Scoville Rating',
          name: 'scoville',
          widget: 'number',
        },
        {
          label: 'Body',
          name: 'body',
          widget: 'markdown',
        },
      ],
    },
  ],
}

export default config
