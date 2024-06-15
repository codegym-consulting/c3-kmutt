import uploadFile from '~/server/libs/storage'
import path from 'path'
import fs from 'fs'

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

    // Validate file types before uploading
    for (const file of files) {
        if (!['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type as string)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid file type. Only PDF, JPG, PNG, and WEBP files are allowed.'
        })
        }
    }

    // Upload files
    const urls = files.map(async (file) => {
        const filePath = path.join(process.cwd(), 'tmp', file.filename as string)
        fs.writeFileSync(filePath, file.data)
        const newFilename = `${Date.now()}.${file?.filename?.split('.').pop()}`;
        const publicUrl = await uploadFile(filePath, `user/${session.user.email}/resume/${newFilename}`)
        fs.unlinkSync(filePath)
        return publicUrl;
    })

    const result = await Promise.all(urls);
    return { urls: result }
})