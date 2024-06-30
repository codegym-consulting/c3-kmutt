import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { RegisterUserSchema , UpdateProfileSchema } from '~/server/api/register/schema'
import type { Option, Response } from '~/utils/repositories/common/model'

export const registerRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async getExpertises(query?: string): Promise<Option[]> {
    return fetch('/expertises', { query: { query } })
  },
  async getInterests(query?: string): Promise<Option[]> {
    return fetch('/interests', { query: { query } })
  },
  async updateDashboardProfile(
    body: PersonalInformation,
    onResponse?: (statusCode: number) => void,
  ): Promise<void> {
    const payload: Partial<UpdateProfileSchema> = {
      occupation: body.occupation?.value as UpdateProfileSchema['occupation'],
      expertises: body.expertises?.map(
        (e) => e.value,
      ) as UpdateProfileSchema['expertises'],
      organization: body.organization
        ?.value as UpdateProfileSchema['organization'],
      faculty: body.faculty?.value as UpdateProfileSchema['faculty'],
      department: body.department?.value as UpdateProfileSchema['department'],
      areaOfInterests: body.areaOfInterests?.map(
        (a) => a.value,
      ) as UpdateProfileSchema['areaOfInterests'],
    }
    return fetch('/profile', {
      body: payload,
      method: 'PATCH',
      onResponse: ({ response }) => {
        const status = response.status as number
        onResponse?.(status)
      },
    })
  },
  async postRegister(
    body: RegisterUserSchema,
    onResponse?: (statusCode: number, res: Response) => void,
  ): Promise<Response> {
    return fetch('/register', {
      method: 'POST',
      body,
      onResponse: ({ response }) => {
        const data = response._data
        const status = response.status
        onResponse?.(status, data)
      },
    })
  },
  async getFaculties(): Promise<Option[]> {
    return fetch('/faculties')
  },
  async getDepartments(facultyId?: number): Promise<Option[]> {
    return fetch('/departments', { query: facultyId ? { facultyId } : {} })
  },
})
