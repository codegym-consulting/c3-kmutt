import { validateFileSize, validateFileType } from '~/utils/validator'
import { uploadFiles } from '~/server/services/common/upload'
import { resizeImage } from '~/server/services/common/resize'
import { updateResume } from '~/server/services/resume/update'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const files = await readMultipartFormData(event)

    if (!files || files && files[0].filename === '') {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: 'No files selected'
        })
    }

    if (files && files.length > 1) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: 'Maximum to 1 file can be uploaded'
        })
    }
    validateFileSize(files, MAX_FILE_SIZE)
    validateFileType(files, ['image/jpeg', 'image/png', 'image/webp'])
    const resizedFiles = await resizeImage(files, 500, 500)
    const urls = await uploadFiles(resizedFiles, `user/${session.user.email}/resume`, 'avatar')
    await updateResume({ userId: session.user.id, photoUrl: urls[0] })
    return { urls }
})
