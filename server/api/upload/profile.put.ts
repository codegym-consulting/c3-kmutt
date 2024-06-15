import path from 'path'
import fs from 'fs'
import uploadFile from '~/server/libs/storage'


export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const files = await readMultipartFormData(event)

    if (!files || files && files[0].filename === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'No files selected'
        })
    }

    if (files && files.length > 1) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Maximum to 1 file can be uploaded'
        })
    }

    // Validate file types before uploading
    for (const file of files) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type as string)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid file type. Only JPG, PNG, and WEBP files are allowed.'
            })
        }
    }

    // TODO: resize file fnc here and transform to webp

    // Upload files
    const urls = files.map(async (file) => {
        const filePath = path.join(process.cwd(), 'tmp', file.filename as string)
        fs.writeFileSync(filePath, file.data)
        const newFilename = `avatar.${file?.filename?.split('.').pop()}`;
        const publicUrl = await uploadFile(filePath, `user/${session.user.email}/${newFilename}`)
        fs.unlinkSync(filePath)
        return publicUrl;
    })

    const result = await Promise.all(urls);
    return { urls: result }
})
