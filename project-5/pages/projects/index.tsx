import withLayout from 'common/components/layout/with-layout'

const Projects = () => {
  const LEN = 4
  const projects = Array.from({ length: LEN })

  return (
    <div className="p-2 h-full flex flex-col gap-2">
      <div className="flex gap-2 h-1/2">
        {projects.slice(0, Math.floor(LEN / 2)).map((_, i) => (
          <div key={i} className="bg-blue-400 rounded flex-auto" />
        ))}
      </div>
      <div className="flex gap-2 h-1/2">
        {projects.slice(Math.floor(LEN / 2)).map((_, i) => (
          <div key={i} className="bg-blue-400 rounded flex-auto" />
        ))}
      </div>
    </div>
  )
}

export default withLayout(Projects)
