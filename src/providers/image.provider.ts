import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';
import { UiProvider } from './ui.provider';
import { File } from '@ionic-native/file';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { config } from '../config';
import { AuthProvider } from '../auth/auth.provider';

declare var cordova: any;
@Injectable()
export class ImageProvider {
  baseUrl = config.baseUrl;
  loadingPopup;

  
  constructor(
    private camera: Camera, 
    private transfer: Transfer, 
    private file: File, 
    private filePath: FilePath, 
    public platform: Platform, 
    public uiProvider: UiProvider,
    public authProvider: AuthProvider
  ) {

    }

  public takePicture(sourceType): Observable<any> {

    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    return new Observable(observer => {
      // Get the data of an image
      this.camera.getPicture(options).then((imagePath) => {
        // Special handling for Android library
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              let newFileName = this.createFileName();
              this.copyFileToLocalDir(correctPath, currentName, newFileName)
                .subscribe(
                  (result) => {
                    observer.next(newFileName)
                  },
                  (error) => {

                  }
                );
            });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          let newFileName = this.createFileName();
          this.copyFileToLocalDir(correctPath, currentName, newFileName)
            .subscribe(
              (result) => {
                observer.next(newFileName)
              },
              (error) => {

              }
            );
        }
      }, (err) => {
        this.uiProvider.showToastMessage('Error while selecting image.');
      });
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    return Observable.fromPromise(this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName));
  }


  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(imagePath): Observable<any> {
    // Destination URL
    let url = this.baseUrl + "images/uploads/upload";

    // File for Upload
    var targetPath = this.pathForImage(imagePath);

    // File name only
    var filename = imagePath;

    let headers = {};
    let authInfo = this.authProvider.getAuthInfo();
    if (authInfo != null) {
        let access_token = authInfo.id;
        headers['Authorization'] = access_token;
        headers['token'] = access_token;
        headers['Content-Type'] = 'multipart/form-data';
    }
  
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: true,
      mimeType: "image/jpeg",
      params: { 'fileName': filename },
      headers: headers
    };

    const fileTransfer: TransferObject = this.transfer.create();
    return new Observable(observer => {
      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then((result) => {
        observer.next({ message: "sucess", result: result });
      },
        (error) => {
          console.log(error);
          observer.error(error);
        });
    });
  }

  public uploadImages(imagesArray: any[]): Observable<any> {
    let observableArray: Array<Observable<any>> = [];
    for (let index = 0; index < imagesArray.length; index++) {
      observableArray.push(this.uploadImage(imagesArray[index]));
    }
    return Observable.forkJoin(...observableArray)
  }
}