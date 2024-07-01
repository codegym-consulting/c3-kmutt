import type { MultiPartData } from 'h3'
import uploadFile from '~/server/libs/storage'

export const uploadFiles = async (files: MultiPartData[], destination: string, fileName?: string) => {
    try {
        const tasks = files.map(async (file) => { 
            const extension = file?.filename?.split('.').pop() 
            let url;
            if (fileName) {
                url = await uploadFile(file.data, destination + '/' + fileName + '.' + extension);
            } else {
                url = await uploadFile(file.data, destination + '/' + Date.now() + '.' + extension);
            }
            return url
        })

        return await Promise.all(tasks)

    } catch (error) {
        console.error(`Error uploading files: ${error}`)
        throw error
    }
}