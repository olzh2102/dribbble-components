import { defineField } from 'sanity'

const fourofour = {
  name: '404',
  title: '404',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    {
      name: 'description',
      title: 'Description',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'localeString',
    },
  ],
}

export default fourofour
