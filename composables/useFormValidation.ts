import { ZodSchema, ZodError, type ZodIssue } from 'zod'

const formatZodIssue = (issue: ZodIssue): string => {
  const { message } = issue
  return message
}

const formatZodError = (error: ZodError): { [key: string]: string } => {
  const formattedErrors: { [key: string]: string } = {}
  error.issues.forEach((issue) => {
    formattedErrors[issue.path[0]] = formatZodIssue(issue)
  })
  return formattedErrors
}

// @NOTE: Order of each field in the state are matter
// (When the error message is shown, it will show the error message from the first field to the touched field)
// @NOTE: schema must be z.Object for this composables to work properly
export function useFormValidation<T>(
  schema: ZodSchema<T>,
  state: any,
  touchField?: Ref<string>,
) {
  const errors = reactive<{ [key: string]: string }>({})

  const validate = () => {
    const _state = state.value
    try {
      schema.parse(_state)
      Object.keys(errors).forEach((key) => {
        delete errors[key]
      })
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        Object.assign(errors, formatZodError(error))
        Object.keys(errors).forEach((key) => {
          if (!(key in formatZodError(error))) {
            delete errors[key]
          }
        })

        // remove error message below the touched field
        if (touchField?.value) {
          const touchFieldIndex = Object.keys(_state).findIndex(
            (key) => key === touchField.value,
          )
          const belowTouchedField = Object.keys(_state).slice(
            touchFieldIndex + 1,
          )
          for (const key of belowTouchedField) {
            if (key in errors) {
              delete errors[key]
            }
          }
        }
      }
      return false
    }
  }

  return { errors, validate }
}
