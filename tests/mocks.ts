export const filterSchemaMock: IFilterSchema[] = [
  {
    type: 'list',
    subType: 'checkbox',
    name: 'species',
    displayName: 'Species',
    values: [
      {
        value: 'annuum',
        displayValue: 'Annuum',
      },
      {
        value: 'chinense',
        displayValue: 'Chinense',
      },
      {
        value: 'frutescens',
        displayValue: 'Frutescens',
      },
      {
        value: 'pubescens',
        displayValue: 'Pubescens',
      },
      {
        value: 'baccatum',
        displayValue: 'Baccatum',
      },
    ],
  },
  {
    type: 'list',
    subType: 'checkbox',
    name: 'origin',
    displayName: 'Origin',
    values: [
      {
        value: 'united-kingdom',
        displayValue: 'United Kingdom',
      },
      {
        value: 'mexico',
        displayValue: 'Mexico',
      },
    ],
  },
  {
    type: 'range',
    subType: 'rangerange',
    name: 'scoville',
    displayName: 'Scoville',
    domain: [0, 10000],
  },
]
