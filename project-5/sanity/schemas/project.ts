const project = {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'area',
      title: 'Area',
      type: 'number',
    },
    {
      name: 'designStyle',
      title: 'Design style',
      type: 'localeString',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'localeString',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      order: 'number',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}

export default project
