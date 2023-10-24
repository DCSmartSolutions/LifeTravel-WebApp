import { Injectable } from '@angular/core';
import {BlobServiceClient, ContainerClient} from "@azure/storage-blob";

@Injectable({
  providedIn: 'root'
})
export class AzureBlobStorageService {
  accountName: string = 'nstoragetest';
  container: string = 'tour-packages-pictures';
  sas = 'sp=racwdli&st=2023-10-24T00:12:03Z&se=2024-01-05T08:12:03Z&sv=2022-11-02&sr=c&sig=ihpBcbG09pC7gTDHSdvhmIJCxf7mqwFY7fZ9wTLg2S4%3D'

  constructor() { }
  //public an image and get the url
  public async uploadImage(content: Blob, tourId: string): Promise<string> {
    const blobName = `${tourId}`;
    const blobClient = this.containerClient().getBlockBlobClient(blobName);
    await blobClient.uploadData(content, {blobHTTPHeaders: {blobContentType: content.type}})
    return blobClient.url;
  }


  private containerClient() : ContainerClient{
    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net?${this.sas}`)
      .getContainerClient(this.container);
  }
}
