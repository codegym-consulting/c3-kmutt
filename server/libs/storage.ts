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

  // Make the file public
  // await storage.bucket(bucketName).file(destination).makePublic();

  // TODO: find some CDN to wrap the bucket
  const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;
  return publicUrl;
}