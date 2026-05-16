import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UploaderService {
  private client: S3Client;
  private bucketName: string;

  constructor() {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!region) {
      throw new InternalServerErrorException(
        'Falta configurar AWS_REGION en .env',
      );
    }

    if (!accessKeyId) {
      throw new InternalServerErrorException(
        'Falta configurar AWS_ACCESS_KEY_ID en .env',
      );
    }

    if (!secretAccessKey) {
      throw new InternalServerErrorException(
        'Falta configurar AWS_SECRET_ACCESS_KEY en .env',
      );
    }

    if (!bucketName) {
      throw new InternalServerErrorException(
        'Falta configurar AWS_BUCKET_NAME en .env',
      );
    }

    this.bucketName = bucketName;

    this.client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async upload(file: any, key: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.client.send(command);
  }

  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });
  }

  async delete(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.client.send(command);
  }

  getBucketName() {
    return this.bucketName;
  }
}