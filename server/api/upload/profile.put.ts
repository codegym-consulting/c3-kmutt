import path from 'path'
import fs from 'fs'

export default defineEventHandler(async (event) => {
    let uploadFilePath: string | null = null
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
            statusMessage: 'Only one file can be uploaded'
        })
    }

    const file = files[0]
    const filePath = path.join(process.cwd(), 'uploads', file.filename as string)
    fs.writeFileSync(filePath, file.data)
    uploadFilePath = filePath

    return uploadFilePath
})