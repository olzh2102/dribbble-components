import { createClient, groq } from 'next-sanity'

export async function getProjects() {
  const client = createClient({
    apiVersion: '2023-06-02',
    dataset: 'production',
    projectId: '0ptjayg8',
    useCdn: false,
  })

  return client.fetch(
    groq`*[_type=="project"]{
        _id,
        name,
        "slug": slug.current,
        area,
        location,
        year
    }`
  )
}
