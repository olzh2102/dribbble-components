export function formatTimeHHMM(milliseconds: number) {
  return new Date(milliseconds).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export const getTimeOfDay = () => {
  const hours = new Date().getHours()

  if (hours >= 4 && hours < 12) return 'morning'
  if (hours >= 12 && hours < 17) return 'afternoon'
  return 'evening'
}
