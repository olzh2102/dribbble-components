export default function RoundedCorner({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full p-3 bg-black dark:bg-white">
      <div className="relative w-full h-full p-3 rounded-xl bg-transparent">{children}</div>
    </div>
  )
}
