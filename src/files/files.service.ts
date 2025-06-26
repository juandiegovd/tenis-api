import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
    private s3Client: S3Client;
    private bucket = process.env.AWS_S3_BUCKET;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION,
            endpoint: 'http://localhost:4566',
            forcePathStyle: true,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!, 
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, 
            },
        });
    }

    async uploadFile(key: string, body: Buffer, contentType: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: body,
            ContentType: contentType,
        });
        await this.s3Client.send(command);
        return `https://localhost:4566/${this.bucket}${key}`;
    }
}
