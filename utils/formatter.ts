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
export const formatFullDate = (date?: string): string => {
  if (!date) return ''
  return dayjs(date).locale('en').format('DD MMMM YYYY')
}
