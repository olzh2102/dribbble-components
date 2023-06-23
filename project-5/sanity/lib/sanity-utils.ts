import { createClient, groq } from 'next-sanity'

const client = createClient({
  apiVersion: '2023-06-02',
  dataset: 'production',
  projectId: '0ptjayg8',
  useCdn: false,
})

export async function getProjects() {
  return client.fetch(
    groq`*[_type=="project"] | order(order){
        _id,
        name,
        "slug": slug.current,
        area,
        location,
        year
    }`
  )
}

export async function getAbout() {
  return client.fetch(groq`*[_type=="about"][0]`)
}
