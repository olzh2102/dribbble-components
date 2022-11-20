export default function RoundedCorner({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full p-3 bg-black dark:bg-white">
      <div className="w-full h-full p-3 rounded-xl bg-white dark:bg-slate-800">{children}</div>
    </div>
  )
}
