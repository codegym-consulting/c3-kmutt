import type { MultiPartData } from 'h3'
import uploadFile from '../libs/storage'

export const uploadFiles = async (files: MultiPartData[], destination: string, fileName?: string) => {
    try {
        const tasks = files.map(async (file) => { 
            const extension = file?.filename?.split('.').pop() 
            const url = await uploadFile(file.data, `${destination}/${fileName ? `${fileName}.${extension}` : `${Date.now()}.${extension}`}`)
            return url;
        })

        return await Promise.all(tasks)

    } catch (error) {
        console.error(`Error uploading files: ${error}`);
        throw error;
    }
}