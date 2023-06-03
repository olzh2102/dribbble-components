import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { schema } from './sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId: '0ptjayg8',
  dataset: 'production',
  schema,
  plugins: [deskTool(), visionTool({ defaultApiVersion: '2023-06-02' })],
})
