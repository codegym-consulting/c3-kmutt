import path from 'path'
import fs from 'fs'

export default defineEventHandler(async (event) => {
    const uploadFilePath: string[] = []
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

    files.forEach(file => {
        const filePath = path.join(process.cwd(), 'tmp', file.filename as string)
        fs.writeFileSync(filePath, file.data)
        uploadFilePath.push(filePath)
    })

     // TODO: will upload to bucket path /users/${session.user.email}/resume/${file.filename}.pdf

    return { urls: uploadFilePath }
})