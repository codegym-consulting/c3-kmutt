import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';

const storage = new Storage();
const bucketName = 'c3-kmutt';
const cacheControl = 'public, max-age=604800'; // 1 week in seconds

export default async function uploadFile(data: Buffer, destination: string) {
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(destination)
  
  await file.setMetadata({
    cacheControl: 'public, max-age=0',
  });

  const stream = new Readable();
  stream.push(data);
  stream.push(null);

  await new Promise((resolve, reject) => {
    stream.pipe(file.createWriteStream({
      metadata: {
        cacheControl
      },
      public: true,
      predefinedAcl: 'publicRead',
    }))
    .on('error', reject)
    .on('finish', resolve);
  });

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;
  return publicUrl;
}