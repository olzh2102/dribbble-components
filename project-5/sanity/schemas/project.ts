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
      name: 'photo',
      title: 'Photo',
      type: 'localeString',
    },
    {
      name: 'area',
      title: 'Area',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'localeString',
    },
    {
      name: 'studio',
      title: 'Studio',
      type: 'localeString',
    },
    {
      name: 'design',
      title: 'Design',
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
      name: 'description',
      title: 'Description',
      type: 'localeString',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}

export default project
