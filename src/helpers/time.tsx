import { addDays } from 'date-fns'

export const datesAreOnSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()

export const getDateWithHours = (hours: number) => {
  let date = new Date()
  const areHoursInPast = date.getHours() >= hours
  date = areHoursInPast ? addDays(date, 1) : date
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours)
  return newDate
}
