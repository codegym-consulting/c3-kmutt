import type { MultiPartData } from 'h3'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (value: any) => {
  if (value === undefined || value === null || value === '') {
    return true
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  if (typeof value === 'string') {
    return value.trim().length === 0
  }
  return false
}

export const isObjectDifferece = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
) => {
  return JSON.stringify(obj1) !== JSON.stringify(obj2)
}

export const validateFileType = (
  files: MultiPartData[],
  supportTypes: string[],
) => {
  for (const file of files) {
    if (!supportTypes.includes(file.type as string)) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Invalid file type. Only ${supportTypes.join(
          ',',
        )} types are allowed.`,
      })
    }
  }
  return
}

export const validateFileSize = (files: MultiPartData[], maxSize: number) => {
  for (const file of files) {
    if (file.data.length > maxSize) {
      return createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Maximum file size is ${maxSize} MB.`,
      })
    }
  }
  return
}
