import type { MultiPartData } from 'h3'
import path from 'path'
import fs from 'fs'
import uploadFile from '../libs/storage'

export const uploadFiles = async (files: MultiPartData[], destination: string, fileName?: string) => {
    try {
        const dirPath = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const tasks = files.map(async (file) => {
            const filePath = path.join(dirPath, file?.filename as string)    
            const extension = file?.filename?.split('.').pop() 
            fs.writeFileSync(filePath, file.data)
            const url = await uploadFile(filePath, `${destination}/${fileName ? `${fileName}.${extension}` : `${Date.now()}.${extension}`}`)
            fs.unlinkSync(filePath)
            return url;
        })

        return await Promise.all(tasks)

    } catch (error) {
        console.error(`Error uploading files: ${error}`);
        throw error;
    }
}