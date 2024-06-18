import type { MultiPartData } from 'h3'
import path from 'path'
import fs from 'fs'
import uploadFile from '../libs/storage'

export const uploadFiles = (files: MultiPartData[], destination: string, fileName?: string) => {
    try {
        const dirPath = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        return files.map(async (file) => {
            const filePath = path.join(dirPath, file.filename as string)
            fs.writeFileSync(filePath, file.data)
            const publicUrl = await uploadFile(filePath, `${destination}/${fileName ? `${fileName}.${file?.filename?.split('.').pop()}` : `${Date.now()}.${file?.filename?.split('.').pop()}`}`)
            fs.unlinkSync(filePath)
            return publicUrl;
        })
    } catch (error) {
        console.error(`Error uploading files: ${error}`);
        throw error;
    }
}