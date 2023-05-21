import { SchemaTypeDefinition } from 'sanity'

import fourofour from './404'
import project from './project'

const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'de', title: 'German' },
  { id: 'ru', title: 'Russian' },
]

const baseLanguage = supportedLanguages.find((l) => l.isDefault)

const localeString = {
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  // Dynamically define one field per language
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, project, fourofour],
}
