import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest';
import { UiProvider } from '../../providers/ui.provider';
import { AdvertismentProvider } from '../../providers/advertisment/advertisment.provider';
import { SelectsOptionsProvider } from '../../providers/select-options.provider';
import { CarModel, BikeModel } from './advertisment.model';
import { ImageProvider } from '../../providers/image.provider';
import * as moment from 'moment';
import { AuthProvider } from '../../auth/auth.provider';

declare var cordova: any;
@Component({
  selector: 'page-add-advertisment',
  templateUrl: 'add-advertisment.html',
})
export class AddAdvertismentPage {


  carSelectOptions: any;
  boatSelectOptions: any;
  truckSelectOptions: any;
  mobileNumbersSelectOptions: any;
  carPalleteSelectsOptions: any;
  bikeSelectOptions: any;

  countries: any[];
  cities: any[];
  types: any[];
  models: any[];
  years: any[] = [];

  images: any[] = [null, null, null, null, null];
  activeTab = 1;
  metaDataLoaded = false;

  carModel: CarModel;
  bikeModel: BikeModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public uiProvider: UiProvider,
    public advertismentProvider: AdvertismentProvider,
    public selectOptionsProvider: SelectsOptionsProvider,
    public imageProvider: ImageProvider,
    public authProvider: AuthProvider
  ) {
    this.carModel = new CarModel();
    this.carModel.user = this.authProvider.getAuthInfo().userId;

  }

  setActiveTab(index) {
    if (index != this.activeTab) {
      this.activeTab = index;
      switch (index) {
        case 1:
          this.carModel = new CarModel();
          this.images = [null, null, null, null, null];
          break;
        case 2:
          this.bikeModel = new BikeModel();
          this.images = [null, null, null, null, null];
          break;
        case 3:

          break;
        case 4:

          break;
        case 5:

          break;

        default:
          break;
      }
    }
  }

  ionViewDidLoad() {
    this.getSelectMenusOptions();
  }

  addCar(form) {
    let formData = form.form.value;
    this.carModel.carClass = formData.carClass;

    this.carModel.case = Number(formData.case);
    this.carModel.city = Number(formData.city);
    this.carModel.country = Number(formData.country);
    this.carModel.cylindersNumber = Number(formData.cylinderNumber);
    this.carModel.fuel = Number(formData.fuel);
    this.carModel.model = Number(formData.model);
    this.carModel.passedKiloeters = formData.passeedKilometers;
    this.carModel.price = formData.price;
    this.carModel.specifications = formData.specificarion;
    this.carModel.supplier = Number(formData.supplier);
    this.carModel.title = formData.title;
    this.carModel.transmission = Number(formData.transmission);
    this.carModel.type = Number(formData.type);
    this.carModel.year = Number(formData.year);


    if (form.valid == false) {
      this.uiProvider.showToastMessage('تأكد من صحة جميع الحقول');
    }
    // else if(this.images.filter( image => image != null).length == 0) {
    //   this.uiProvider.showToastMessage('يجب رفع صورة احدة على الأقل');
    // } 
    else {
      this.uiProvider.showLoadingPopup("جاري رفع الصور");
      let imagesToUpload = this.images.filter(image => image != null);
      this.imageProvider.uploadImages(imagesToUpload)
        .subscribe(
          (result) => {
            this.uiProvider.hideLoadingPopup();
            console.log(result);
          },
          (error) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage(JSON.stringify(error));
          }
        );

      // let data = CarModel.mapModelToApiModel(this.carModel);
      // console.log(this.carModel);
      // console.log(data);

      // this.advertismentProvider.postCarAdvertisment(data)
      //   .subscribe(
      //     (result) => {

      //     },
      //     (error) => {

      //     }
      //   )
    }
  }

  addBoat() {

  }

  addTruck() {

  }

  addBike(form) {
    let formData = form.form.value;
    

    this.bikeModel.bikeCase = Number(formData.bikeCase);
    this.bikeModel.city = Number(formData.city);
    this.bikeModel.country = Number(formData.country);
    this.bikeModel.cylindersNumber = Number(formData.cylinderNumber);
    this.bikeModel.fuel = Number(formData.fuel);
    this.bikeModel.model = Number(formData.model);
    this.bikeModel.passedKiloeters = formData.passeedKilometers;
    this.bikeModel.price = formData.price;
    this.bikeModel.specifications = formData.specificarion;
    this.bikeModel.enginePower = Number(formData.enginePower);
    this.bikeModel.title = formData.title;
    this.bikeModel.color = Number(formData.color);
    this.bikeModel.type = Number(formData.type);
    this.bikeModel.year = Number(formData.year);


    if (form.valid == false) {
      this.uiProvider.showToastMessage('تأكد من صحة جميع الحقول');
    }
    // else if(this.images.filter( image => image != null).length == 0) {
    //   this.uiProvider.showToastMessage('يجب رفع صورة احدة على الأقل');
    // } 
    else {
      this.uiProvider.showLoadingPopup("جاري رفع الصور");
      let imagesToUpload = this.images.filter(image => image != null);
      this.imageProvider.uploadImages(imagesToUpload)
        .subscribe(
          (result) => {
            this.uiProvider.hideLoadingPopup();
            console.log(result);
          },
          (error) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage(JSON.stringify(error));
          }
        );

      // let data = BikeModel.mapModelToApiModel(this.carModel);
      // console.log(this.carModel);
      // console.log(data);

      // this.advertismentProvider.postCarAdvertisment(data)
      //   .subscribe(
      //     (result) => {

      //     },
      //     (error) => {

      //     }
      //   )
    }
  }

  addCarNumber() {

  }

  addMobileNumber() {

  }

  getSelectMenusOptions() {
    // Get Remote Options from API and filter them
    this.uiProvider.showLoadingPopup("جاري جلب البيانات");
    this.advertismentProvider.getSelectOptions()
      .subscribe(
        (result) => {
          this.uiProvider.hideLoadingPopup();

          this.carSelectOptions = this.selectOptionsProvider.getCarOptions(result[2].data);
          this.bikeSelectOptions = this.selectOptionsProvider.getBikeSelectOptions(result[2].data);
          this.boatSelectOptions = this.selectOptionsProvider.getBikeSelectOptions(result[2].data);
          this.truckSelectOptions = this.selectOptionsProvider.getTruckSelectOptions(result[2].data);
          this.carPalleteSelectsOptions = this.selectOptionsProvider.getCarPalleteSelectOptions(result[2].data);
          this.mobileNumbersSelectOptions = this.selectOptionsProvider.getMobileNumberSelectOptions(result[2].data);
          this.countries = result[0].data;
          this.cities = result[0].data;
          this.types = result[1].data;
          this.models = result[1].data;
          this.metaDataLoaded = true;
          console.log(result);
          console.log(this.bikeSelectOptions);
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
          console.log(error);
        }
      );

    // Generate Years
    let startYear = Number(moment().subtract('50', 'years').format('YYYY'));
    for (let index = 0; index <= 50; index++) {
      this.years.push(startYear + index);
    }

  }

  public presentActionSheet(imageIndex) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.imageProvider.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
              .subscribe(
                (result) => {
                  this.images[imageIndex] = result;
                  console.log(result);
                  console.log(this.carModel);
                },
                (error) => {
                  console.log(error);
                }
              )
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.imageProvider.takePicture(this.camera.PictureSourceType.CAMERA)
              .subscribe(
                (result) => {
                  this.images[imageIndex] = result;
                  console.log(result);
                  console.log(this.carModel);
                },
                (error) => {
                  console.log(error);
                }
              )
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
}
