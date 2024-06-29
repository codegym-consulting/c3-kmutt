import dayjs from 'dayjs'

export const formatName = (name: string) => {
  return name.split(' ')[0] + ' ' + name.split(' ')[1].charAt(0) + '.'
}
export const formatFileSize = (size: number, unit: 'KB' | 'MB'): number => {
  if (unit === 'KB') {
    return +(size / 1024).toFixed(2)
  } else {
    return +(size / 1024 / 1024).toFixed(2)
  }
}
export const formatFullDate = (
  date?: string,
  format = 'DD MMMM YYYY',
): string => {
  if (!date) return ''
  return dayjs(date).locale('en').format(format)
}

export const timeAgo = (date: string): string => {
  // support minute ago, hour ago, above 1 day show date
  const now = dayjs()
  const target = dayjs(date)
  const diff = now.diff(target, 'minute')
  if (diff < 60) {
    return `${diff} minute${diff > 1 ? 's' : ''} ago`
  }
  if (diff < 1440) {
    return `${now.diff(target, 'hour')} hour${
      now.diff(target, 'hour') > 1 ? 's' : ''
    } ago`
  }
  return formatFullDate(date, 'DD MMM YYYY')
}
