import { ZodError, type ZodSchema, type ZodIssue } from 'zod'

const formatZodIssue = (issue: ZodIssue): string => {
  const { message } = issue
  return message
}

const formatZodError = (error: ZodError): string => {
  const issue = error.issues.pop()
  if (!issue) return ''
  return formatZodIssue(issue)
}

export function useFieldValidation<T>(
  schema: ZodSchema<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
) {
  const _error = ref('')

  const clear = () => {
    _error.value = ''
  }

  const validate = () => {
    const _state = state?.value
    try {
      schema.parse(_state)
      _error.value = ''
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        _error.value = formatZodError(error)
      }
      return false
    }
  }

  return { error: _error, validate, clear }
}
