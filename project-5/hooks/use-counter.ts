export default function useCounter({
  from = 0,
  to = 100,
  duration,
  onFinish,
}: {
  from?: number
  to?: number
  duration: number
  onFinish: () => void
}) {
  return 100
}
