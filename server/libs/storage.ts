import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucketName = 'c3-kmutt';
const cacheControl = 'public, max-age=604800'; // 1 week in seconds

export default async function uploadFile(filePath: string, destination: string) {
  await storage.bucket(bucketName).upload(filePath, {
    destination,
    predefinedAcl: 'publicRead',
    metadata: {
      cacheControl
    }
  });
  const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;
  return publicUrl;
}