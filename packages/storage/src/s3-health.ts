import { HeadBucketCommand, S3Client } from "@aws-sdk/client-s3";
import type { DependencyProbe } from "@serialos/application";

export interface S3HealthOptions {
  readonly accessKeyId: string;
  readonly bucket: string;
  readonly endpoint: string;
  readonly forcePathStyle: boolean;
  readonly region: string;
  readonly secretAccessKey: string;
}

export class S3BucketHealthProbe implements DependencyProbe {
  public readonly name = "object_storage";
  readonly #bucket: string;
  readonly #client: S3Client;

  public constructor(options: S3HealthOptions) {
    this.#bucket = options.bucket;
    this.#client = new S3Client({
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
      endpoint: options.endpoint,
      forcePathStyle: options.forcePathStyle,
      region: options.region,
      requestHandler: {
        requestTimeout: 2_000,
      },
    });
  }

  public async check(): Promise<void> {
    await this.#client.send(new HeadBucketCommand({ Bucket: this.#bucket }));
  }

  public destroy(): void {
    this.#client.destroy();
  }
}
