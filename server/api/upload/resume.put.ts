import { validateFileSize, validateFileType } from '~/utils/validator'
import { uploadFiles } from '~/server/services/upload'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const files = await readMultipartFormData(event)

    if (!files || files && files[0].filename === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'No files selected'
        })
    }

    if (files && files.length > 3) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Maximum to 3 files can be uploaded'
        })
    }

    validateFileSize(files, MAX_FILE_SIZE)
    validateFileType(files, ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
    // TODO: resize file fnc here

    const urls = await Promise.all(uploadFiles(files, `user/${session.user.email}/resume`));
    return { urls }
})