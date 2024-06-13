import path from 'path'
import fs from 'fs'

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
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
    const filePath = path.join(process.cwd(), 'tmp', file.filename as string)
    fs.writeFileSync(filePath, file.data)
    uploadFilePath = filePath

    console.log(session.user.email)
    // TODO: will upload to bucket path /users/${session.user.email}/profile.png
    return { url: uploadFilePath }
})