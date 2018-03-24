import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../auth/auth.provider';
import { UiProvider } from '../../providers/ui.provider';
import { Camera } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image.provider';
import { MyAccountPage } from '../my-account/my-account';
import { Events } from 'ionic-angular'

@Component({
  selector: 'page-edit-profile-modal',
  templateUrl: 'edit-profile-modal.html',
})
export class EditProfileModalPage {
  userId: any;
  userInfo: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authProvider: AuthProvider,
    public uiProvider: UiProvider,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private imageProvider: ImageProvider,
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfileModalPage');
    this.userId = this.navParams.data.userId;
    this.getUserDetails();
  }

  getUserDetails() {
    this.uiProvider.showLoadingPopup("جاري جلب البيانات");
    this.authProvider.getUserDetails(this.userId)
      .subscribe(
        (result) => {
          this.userInfo = result.data;
          this.uiProvider.hideLoadingPopup();
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
          this.uiProvider.showToastMessage(error.error.message);
          console.log(error.error.message);
        }
      );
  }

  submitEditProfile(editProfileForm) {

    if(editProfileForm.valid) {
      this.uiProvider.showLoadingPopup("جاري ارسال البيانات");
      this.authProvider.editUserInfo(this.userInfo)
        .subscribe(
          (result) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage("تك تعديل البيانات بنجاح");
            this.events.publish("reload");
            this.navCtrl.pop();
          },
          (error) => {
            this.uiProvider.showToastMessage(error.error.message);
          }
        )
    } else {
      this.uiProvider.showToastMessage("تأكد من صحة جميع الحقول÷");
    }
  }

  closeModal() {
    this.navCtrl.pop();
  }

  
}
