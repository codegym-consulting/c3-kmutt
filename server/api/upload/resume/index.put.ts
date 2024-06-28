import { uploadFiles } from '~/server/services/common/upload'
import { createResume } from '~/server/services/resume/create'
import { validateFileSize, validateFileType } from '~/utils/validator'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const files = await readMultipartFormData(event)

    if (!files || files && files[0].filename === '') {
        throw createError({
            statusCode: 400,
            message: "Bad Request",
            statusMessage: 'No files selected'
        })
    }

    if (files && files.length > 3) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: 'Maximum to 3 files can be uploaded'
        })
    }

    validateFileSize(files, MAX_FILE_SIZE)
    validateFileType(files, ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
    const urls = await uploadFiles(files, `user/${session.user.email}/resume`)
    await createResume({ userId: session.user.id, isFileType: true, fileUrls: urls, name: session.user.name, email: session.user.email })
    return { urls }
})