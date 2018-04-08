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
import { CarModel, BikeModel, TruckModel, BoatModel, MobileNumberModel, CarPalleteModel } from './advertisment.model';
import { ImageProvider } from '../../providers/image.provider';
import * as moment from 'moment';
import { AuthProvider } from '../../auth/auth.provider';
import { ResourceLoader } from '@angular/compiler';
import { ItemDetailsPage } from '../item-details/item-details';

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
  carPalleteSelectOptions: any;
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
  truckModel: TruckModel;
  boatModel: BoatModel;
  mobileNumberModel: MobileNumberModel;
  carPalleteModel: CarPalleteModel;

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
      this.images = [null, null, null, null, null];
      this.activeTab = index;
      switch (index) {
        case 1:
          this.carModel = new CarModel();
          this.carModel.user = this.authProvider.getAuthInfo().userId;
          break;
        case 2:
          this.bikeModel = new BikeModel();
          this.bikeModel.user = this.authProvider.getAuthInfo().userId;
          break;
        case 3:
          this.truckModel = new TruckModel();
          this.truckModel.user = this.authProvider.getAuthInfo().userId;
          break;
        case 4:
          this.boatModel = new BoatModel();
          this.boatModel.user = this.authProvider.getAuthInfo().userId;
          break;
        case 5:
          this.mobileNumberModel = new MobileNumberModel();
          this.mobileNumberModel.user = this.authProvider.getAuthInfo().userId;
          break;
        case 6:
          this.carPalleteModel = new CarPalleteModel();
          this.carPalleteModel.user = this.authProvider.getAuthInfo().userId;
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
    else if(this.images.filter( image => image != null).length == 0) {
      this.uiProvider.showToastMessage('يجب رفع صورة احدة على الأقل');
    } 
    else {
      this.uiProvider.showLoadingPopup("جاري رفع الصور");
      let imagesToUpload = this.images.filter(image => image != null);
      this.imageProvider.uploadImages(imagesToUpload)
        .subscribe(
          (result) => {
            this.uiProvider.hideLoadingPopup();
            for (let index = 0; index < result.length; index++) {
              const element = result[index];
              let response = JSON.parse(element.response);
              this.carModel.images.push(response.data.result.files.file[0].name);  
            }
            let data = CarModel.mapModelToApiModel(this.carModel);      
            this.postAdvertisment(data);
          },
          (error) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage(JSON.stringify(error));
          }
        );
    }
  }

  addBoat(form) {

    let formData = form.form.value;

    this.boatModel.boatCase = Number(formData.boatCase);
    this.boatModel.city = Number(formData.city);
    this.boatModel.country = Number(formData.country);
    this.boatModel.enginePower = Number(formData.enginePower);
    this.boatModel.fuel = Number(formData.fuel);
    this.boatModel.engineSpeed = Number(formData.engineSpeed);
    this.boatModel.passedKiloeters = formData.passeedKilometers;
    this.boatModel.price = formData.price;
    this.boatModel.specifications = formData.specificarion;
    this.boatModel.boatLength = Number(formData.boatLength);
    this.boatModel.title = formData.title;
    this.boatModel.loadQuantity = Number(formData.loadQuantity);
    this.boatModel.year = Number(formData.year);

    if (form.valid == false) {
      this.uiProvider.showToastMessage('تأكد من صحة جميع الحقول');
    }
    else if(this.images.filter( image => image != null).length == 0) {
      this.uiProvider.showToastMessage('يجب رفع صورة احدة على الأقل');
    } 
    else {
      this.uiProvider.showLoadingPopup("جاري رفع الصور");
      let imagesToUpload = this.images.filter(image => image != null);
      this.imageProvider.uploadImages(imagesToUpload)
        .subscribe(
          (result) => {
            this.uiProvider.hideLoadingPopup();
            for (let index = 0; index < result.length; index++) {
              const element = result[index];
              let response = JSON.parse(element.response);
              this.boatModel.images.push(response.data.result.files.file[0].name);  
            }
            let data = BoatModel.mapModelToApiModel(this.boatModel);
            this.postAdvertisment(data);
          },
          (error) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage(JSON.stringify(error));
          }
        );
    }
  }

  addTruck(form) {
    let formData = form.form.value;

    this.truckModel.truckCase = Number(formData.truckCase);
    this.truckModel.city = Number(formData.city);
    this.truckModel.country = Number(formData.country);
    this.truckModel.cylindersNumber = Number(formData.cylinderNumber);
    this.truckModel.fuel = Number(formData.fuel);
    this.truckModel.transmission = Number(formData.transmission);
    this.truckModel.passedKiloeters = formData.passeedKilometers;
    this.truckModel.price = formData.price;
    this.truckModel.specifications = formData.specificarion;
    this.truckModel.enginePower = Number(formData.enginePower);
    this.truckModel.title = formData.title;
    this.truckModel.color = Number(formData.color);
    this.truckModel.year = Number(formData.year);
    this.truckModel.loadQuantity = formData.loadQuantity;

    if (form.valid == false) {
      this.uiProvider.showToastMessage('تأكد من صحة جميع الحقول');
    }
    else if(this.images.filter( image => image != null).length == 0) {
      this.uiProvider.showToastMessage('يجب رفع صورة احدة على الأقل');
    } 
    else {
      this.uiProvider.showLoadingPopup("جاري رفع الصور");
      let imagesToUpload = this.images.filter(image => image != null);
      this.imageProvider.uploadImages(imagesToUpload)
        .subscribe(
          (result) => {
            this.uiProvider.hideLoadingPopup();
            for (let index = 0; index < result.length; index++) {
              const element = result[index];
              let response = JSON.parse(element.response);
              this.truckModel.images.push(response.data.result.files.file[0].name);  
            }
            let data = TruckModel.mapModelToApiModel(this.truckModel);
            this.postAdvertisment(data);
          },
          (error) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage(JSON.stringify(error));
          }
        );

    }
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
    else if(this.images.filter( image => image != null).length == 0) {
      this.uiProvider.showToastMessage('يجب رفع صورة احدة على الأقل');
    } 
    else {
      this.uiProvider.showLoadingPopup("جاري رفع الصور");
      let imagesToUpload = this.images.filter(image => image != null);
      this.imageProvider.uploadImages(imagesToUpload)
        .subscribe(
          (result) => {
            this.uiProvider.hideLoadingPopup();
            for (let index = 0; index < result.length; index++) {
              const element = result[index];
              let response = JSON.parse(element.response);
              this.bikeModel.images.push(response.data.result.files.file[0].name);  
            }
            let data = BikeModel.mapModelToApiModel(this.bikeModel);
            this.postAdvertisment(data);
          },
          (error) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage(JSON.stringify(error));
          }
        );
    }
  }

  addCarNumber(form) {
    let formData = form.form.value;

    this.carPalleteModel.title = formData.title;
    this.carPalleteModel.country = Number(formData.country);
    this.carPalleteModel.city = Number(formData.city);
    this.carPalleteModel.price = formData.price;
    this.carPalleteModel.specifications = formData.specifications;
    this.carPalleteModel.carPalleteCategory = formData.carPalleteCategory;
    this.carPalleteModel.year = Number(formData.year);
    this.carPalleteModel.carPalleteType = formData.carPalleteType;
    this.carPalleteModel.carPalleteSymbol = formData.carPalleteSymbol;
    this.carPalleteModel.palleteNumber = formData.palleteNumber;

    if (form.valid == false) {
      this.uiProvider.showToastMessage('تأكد من صحة جميع الحقول');
    }
    else {
      let data = CarPalleteModel.mapModelToApiModel(this.carPalleteModel);
      this.postAdvertisment(data);
    }
  }

  addMobileNumber(form) {
    let formData = form.form.value;

    this.mobileNumberModel.city = Number(formData.city);
    this.mobileNumberModel.country = Number(formData.country);
    this.mobileNumberModel.price = formData.price;
    this.mobileNumberModel.specification = formData.specificarion;
    this.mobileNumberModel.mobileProviderCompany = Number(formData.mobileProviderCompany);
    this.mobileNumberModel.title = formData.title;
    this.mobileNumberModel.mobileNumber = Number(formData.mobileNumber);

    if (form.valid == false) {
      this.uiProvider.showToastMessage('تأكد من صحة جميع الحقول');
    } else {
      let data = MobileNumberModel.mapModelToApiModel(this.mobileNumberModel);
      this.postAdvertisment(data);
    }
  }

  postAdvertisment(data) {
    this.uiProvider.showLoadingPopup("جاري نشر الإعلان");
    this.advertismentProvider.postAdvertisment(data)
      .subscribe(
        (result) => {
          this.uiProvider.hideLoadingPopup();
          this.uiProvider.showToastMessage("تم إضافة الإعلان بنجاح");
          this.navCtrl.push(ItemDetailsPage, { item_id: result.data.id_c });
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
          this.uiProvider.showToastMessage(JSON.stringify(error));
        }
      );
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
          this.boatSelectOptions = this.selectOptionsProvider.getBoatSelectOptions(result[2].data);
          this.truckSelectOptions = this.selectOptionsProvider.getTruckSelectOptions(result[2].data);
          this.carPalleteSelectOptions = this.selectOptionsProvider.getCarPalleteSelectOptions(result[2].data);
          this.mobileNumbersSelectOptions = this.selectOptionsProvider.getMobileNumberSelectOptions(result[2].data);
          this.countries = result[0].data;
          this.cities = result[0].data;
          this.types = result[1].data;
          this.models = result[1].data;
          this.metaDataLoaded = true;
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
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
                },
                (error) => {
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
