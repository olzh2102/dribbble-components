import { createClient } from 'next-sanity'

export const client = createClient({
  apiVersion: '2023-06-02',
  dataset: 'production',
  projectId: '0ptjayg8',
  useCdn: false,
})
