import { SchemaTypeDefinition } from 'sanity'

import about from './about'
import project from './project'

const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'de', title: 'German' },
  { id: 'ru', title: 'Russian' },
]

const localeString = {
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    options: lang.isDefault ? null : 'translations',
  })),
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, project, about],
}
