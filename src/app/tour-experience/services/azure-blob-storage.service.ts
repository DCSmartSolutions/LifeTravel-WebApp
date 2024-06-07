import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root',
})
export class AzureBlobStorageService {
  accountName: string = 'nexusnovastorage';
  container: string = 'tour-packages-images';
  sas =
    'sp=racwd&st=2024-06-07T17:09:20Z&se=2024-09-07T01:09:20Z&sv=2022-11-02&sr=c&sig=t1fpecltaEhWvihZxGbrIndMYd0BqHx9xpXbTNFc%2F5c%3D';

  constructor() {}
  //public an image and get the url
  public async uploadImage(content: Blob): Promise<string> {
    const blobName = `${new Date().getTime()}`;
    const blobClient = this.containerClient().getBlockBlobClient(blobName);
    await blobClient.uploadData(content, {
      blobHTTPHeaders: { blobContentType: content.type },
    });
    return blobClient.url;
  }

  private containerClient(): ContainerClient {
    return new BlobServiceClient(
      `https://${this.accountName}.blob.core.windows.net?${this.sas}`,
    ).getContainerClient(this.container);
  }
}
