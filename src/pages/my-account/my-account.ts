import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { EditProfileModalPage } from '../edit-profile-modal/edit-profile-modal';
import { AuthProvider } from '../../auth/auth.provider';
import { UiProvider } from '../../providers/ui.provider';
import { Camera } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image.provider';
import { config } from '../../config';
import { Events } from 'ionic-angular'

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  userId: any;
  userInfo: any;
  newUserImage: any;
  assetsUrl: any = config.assetsBaseUrl;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public authProvider: AuthProvider,
    public uiProvider: UiProvider,
    private camera: Camera,
    private imageProvider: ImageProvider,
    private events: Events
  ) {
    this.events.subscribe('reload', () => this.getUserDetails());
  }

  editprofile() {
    let profileModal = this.modalController.create(EditProfileModalPage, { userId: this.userId });
    profileModal.present();
  }
  ionViewDidLoad() {
    this.userId = this.navParams.data.userId;
    this.getUserDetails();
  }

  getUserDetails() {
    this.uiProvider.showLoadingPopup('جاري جلب البيانات');
    this.authProvider.getUserDetails(this.userId)
      .subscribe(
        (result) => {
          this.userInfo = result.data;
          this.uiProvider.hideLoadingPopup();
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
        }
      );
  }

  public editImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.imageProvider.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
              .subscribe(
                (result) => {
                  this.uiProvider.showLoadingPopup("جاري رفع الصورة");
                  this.imageProvider.uploadImage(result)
                    .subscribe(
                      (result) => {
                        this.uiProvider.hideLoadingPopup();
                        console.log(result);
                        let response = JSON.parse(result.result.response);
                        console.log(response.data.result.files.file[0].name);
                        this.userInfo.image_u = response.data.result.files.file[0].name;
                      }
                    )
                },
                (error) => {
                  this.uiProvider.hideLoadingPopup();
                  console.log(error);
                  this.uiProvider.showToastMessage(error.error.message);
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
                  this.uiProvider.showLoadingPopup("جاري رفع الصورة");
                  this.imageProvider.uploadImage(result)
                    .subscribe(
                      (result) => {
                        this.uiProvider.hideLoadingPopup();
                        let response = JSON.parse(result.result.response)
                        this.userInfo.image_u = response.data.result.files.file[0].name;
                        this.editUser();
                      }
                    )
                },
                (error) => {
                  this.uiProvider.hideLoadingPopup();
                  console.log(error);
                  this.uiProvider.showToastMessage(error.error.message);
                }
              );
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

  editUser() {
    
    this.authProvider.editUserInfo(this.userInfo)
      .subscribe(
        (result) => {
          this.uiProvider.showToastMessage("تم تعديل الصورة بنجاح")
        },
        (error) => {
          this.uiProvider.showToastMessage(error.error.message);
        }
      );
  }
}
