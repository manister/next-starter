import { NetlifyCmsConfig } from './types'

const config: NetlifyCmsConfig = {
  backend: {
    name: 'github',
    repo: 'manister/next-starter',
    branch: 'main',
  },
  media_folder: 'public/img',
  public_folder: 'img',
  publish_mode: 'simple',
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
          label: 'Scoville Rating (min)',
          name: 'scovilleMin',
          widget: 'number',
        },
        {
          label: 'Scoville Rating (max)',
          name: 'scovilleMax',
          widget: 'number',
        },
        {
          label: 'Species',
          name: 'species',
          widget: 'relation',
          collection: 'species',
          valueField: 'title',
          searchFields: 'title',
        },
      ],
    },
    {
      label: 'Species',
      name: 'species',
      folder: '_content/species',
      create: true,
      fields: [
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
        },
      ],
    },
  ],
}

export default config
