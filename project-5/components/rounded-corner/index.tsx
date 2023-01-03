export default function RoundedCorner({
  waveBackground,
  children,
}: {
  waveBackground: boolean
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full p-3 bg-primary-200 dark:bg-secondary-300">
      <div
        className={`relative w-full h-full rounded-xl ${
          !waveBackground && 'bg-secondary-300 dark:bg-secondary-100'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
