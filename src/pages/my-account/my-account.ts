import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { EditProfileModalPage } from '../edit-profile-modal/edit-profile-modal';
import { AuthProvider } from '../../auth/auth.provider';
import { UiProvider } from '../../providers/ui.provider';

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  userId: any ;
  userInfo:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalController: ModalController, 
    public actionSheetCtrl: ActionSheetController, 
    public authProvider: AuthProvider,
    public uiProvider: UiProvider
  ) {
  }

  editprofile() {
    let profileModal = this.modalController.create(EditProfileModalPage, { userId: this.userId });
    profileModal.present();
  } 
  ionViewDidLoad() {
    this.userId = this.navParams.data.userId;
    console.log(this.userId);
    console.log(this.navParams.data);
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

}
