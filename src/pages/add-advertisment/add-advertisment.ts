import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
 
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest'; 
import { UiProvider } from '../../providers/ui.provider';

declare var cordova: any;
@Component({
  selector: 'page-add-advertisment',
  templateUrl: 'add-advertisment.html',
})
export class AddAdvertismentPage {
   upload_responce :any;
   i:any;
  // selects options
  cities:any;
  carstype:any; 
  carsmodels:any;
  carsstatus:any; 
  years:any;
  prices:any;
  kilomtrat:any;
  specifications:any; 
  qarante:any;
  //
  //
  title:any;
  notes:any;
  city :any;
 country :any;
 type:any;
 model :any;
 status :any;
 year :any;
  color:any;
  qrante:any;
  manufactured:any;
 kilom :any;
 //
  activeTab = 1;
  lastImage: string = null;
  lastImage1: string = null;
  lastImage2: string = null;
  lastImage3: string = null;
  lastImage4: string = null;
  id:any;
  images: any = [];
  images_reponce_names:any = [];
  loading: Loading;
  constructor(public restProvider: RestProvider,public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public uiProvider: UiProvider) { }

  setActiveTab(index) {
    this.activeTab = index;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdvertismentPage');
  }
  /*uploadImage(event) {
    console.log(event.target);
  }*/
  ionViewCanEnter(){
    return  this.getselects();
  }
  
  add_car(){
    //this.uploadImage();
    // Create the popup
    //console.log("soso",Object.getOwnPropertyNames(JSON.parse(this.upload_responce).data.result.files.file[0]));
    /*var images_c = [];
    var r_arr = JSON.parse(this.upload_responce).data.result.files.file;
    for (var i in r_arr) {
      console.log("soso",r_arr[i].name);
      images_c.push(r_arr[i].name);
    }
    console.log("fff",images_c);*/
    let loadingPopup = this.loadingCtrl.create({
      content: 'جاري اضافة الاعلان ....'
    }); 
                      
   
    // Show the popup
    loadingPopup.present();
    return this.restProvider.add_car(this.activeTab,this.title,
      this.model,
      this.type,
      this.notes,
      this.kilom,
      this.status,
      this.manufactured,
      this.year,
      this.qrante,
      this.color,
      this.images_reponce_names
      )   
    .then(data2 => {
       console.log("ccc" ,JSON.stringify(data2));
      loadingPopup.dismiss();
      this.uiProvider.showToastMessage('تم رفع الصور والاعلان بنجاح.');
      this.navCtrl.pop();
    });
  }
  getselects(){
           
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'جاري جلب البيانات .....'
    }); 
    // Show the popup 
    loadingPopup.present();
    return this.restProvider.getcitiesRest() 
    .then(data2 => { 
      this.cities = data2; 
      console.log(this.cities);
      return this.restProvider.getcars_type()
      .then(data => {
        this.carstype = data;
        console.log(this.carstype);
        return this.restProvider.getcars_model(16)
        .then(data => {  
          this.carsmodels = data;
          console.log(this.carsmodels);
          return this.restProvider.getcars_model(22) 
          .then(data => {
            this.carsstatus = data;
            console.log(this.carsstatus);
            return this.restProvider.getcars_model(20) 
            .then(data => {
              this.years = data;
              console.log(this.years);
              return this.restProvider.getcars_model(24) 
              .then(data => {
                this.prices = data;
                console.log(this.prices);
                return this.restProvider.getcars_model(50) 
                .then(data => {
                  this.kilomtrat = data;
                  console.log(this.kilomtrat);
                  return this.restProvider.getcars_model(13) 
                  .then(data => {
                    this.specifications = data;
                    console.log(this.specifications);
                    return this.restProvider.getcars_model(61) 
                    .then(data => {
                      this.qarante = data;
                      console.log(this.qarante);
                      loadingPopup.dismiss();
                    });
                    //loadingPopup.dismiss();
                  });
                  //loadingPopup.dismiss();
                });
                //loadingPopup.dismiss();
              });
              //loadingPopup.dismiss();
            });
            //loadingPopup.dismiss();
          });
          //loadingPopup.dismiss();
        });
        //loadingPopup.dismiss();
      });
       //loadingPopup.dismiss();
    }); 
  }
  public presentActionSheet(id) {
    this.id = id;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,id);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA,id);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  public takePicture(sourceType,id) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),id);
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),id);
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }


  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName,id) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      switch (id) {
        case "0": 
          this.lastImage = newFileName;
          break;
        case "1":
          this.lastImage1 = newFileName;
          break;
        case "2":
          this.lastImage2 = newFileName;
          break;
        case "3": 
          this.lastImage3 = newFileName;
          break;
        case "4":
          this.lastImage4 = newFileName;
          break;
        default:
          this.lastImage = newFileName;
          break;
      }
      this.images.push(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
   
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  public  add() {
     this.uploadImage();
    //console.log('string2:', JSON.stringify(this.images_reponce_names));
  }


  public uploadImage() {
    // Destination URL
    var url = "http://automark.ae:3000/api/images/uploads/upload";
     this.loading = this.loadingCtrl.create({
        content: 'جاري رفع الصور...',
      });
      this.loading.present();
      var j=0;
    for(this.i=0; this.i<this.images.length; this.i++)
    {
      // File for Upload
      var targetPath = this.pathForImage(this.images[this.i]);
     
      // File name only
      var filename = this.images[this.i];
     
      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename}
      };
     
      const fileTransfer: TransferObject = this.transfer.create();
     
      
     
      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data1 => {
        j++;
        //this.upload_responce = data1["response"];
        this.images_reponce_names.push(JSON.parse(data1["response"]).data.result.files.file[0].name);
        //console.log(data1+"sss");
        //this.navCtrl.setRoot(HomePage);
        /*console.log('string1:', JSON.stringify(JSON.parse(data1["response"]).data.result.files.file[0].name));
        console.log('length:',JSON.stringify(this.images.length));
        console.log('i:',JSON.stringify(this.i));*/
        if ( j == this.images.length){
          console.log('string2:', JSON.stringify(this.images_reponce_names));
          this.loading.dismissAll()
           
          this.add_car();
        }
        
        //console.log('string1:', data1["response"]);
        //console.log('string2:', JSON.parse(JSON.stringify(data1["response"]))[0].data);
       // console.log('string3:', data1.response.data.result);
        //console.log('string4:', data1.response.data.result.files);
        //console.log('string5:', data1.response.data.result.files.file);
     
        //this.add_car();   
      }, err => {
        this.loading.dismissAll()
        this.presentToast('يوجد خطأ في رفع الصورة.');
      });
    }
    //console.log('string2:', JSON.stringify(this.images_reponce_names));
  } 
}
  