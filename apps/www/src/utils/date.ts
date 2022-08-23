import {
  format,
  parseISO,
  formatDistanceToNow,
  differenceInDays,
  endOfDay,
  differenceInYears,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { percentage } from './number'

export const formatDate = (date: string) =>
  date
    ? format(parseISO(date), 'E, dd MMM yyy', {
        locale: ptBR,
      })
    : ''

export const formatTime = (date: string) =>
  date
    ? format(parseISO(date), 'HH:mm', {
        locale: ptBR,
      })
    : ''

export const formatDateDistance = (date: string) =>
  date
    ? formatDistanceToNow(parseISO(date), {
        locale: ptBR,
      })
    : ''

export const dateRangePercentage = (start_date: string, end_date: string) => {
  // Total number of days
  const totalDays = differenceInDays(parseISO(end_date), parseISO(start_date))

  // Total days from now
  const daysTillToday = differenceInDays(
    endOfDay(new Date()),
    parseISO(start_date)
  )

  if (daysTillToday <= 0) {
    return 0
  }

  return percentage(totalDays, daysTillToday)
}

export const calculateAge = (dob: string) => {
  return differenceInYears(endOfDay(new Date()), parseISO(dob))
}
