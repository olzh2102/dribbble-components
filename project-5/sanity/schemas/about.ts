const about = {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeString',
    },
    {
      name: 'experiences',
      title: 'Experiences',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'experience',
          fields: [
            {
              type: 'localeString',
              name: 'position',
            },
            {
              type: 'datetime',
              name: 'start',
            },
            {
              type: 'datetime',
              name: 'end',
            },
            {
              type: 'localeString',
              name: 'description',
            },
          ],
        },
      ],
    },
  ],
}

export default about
