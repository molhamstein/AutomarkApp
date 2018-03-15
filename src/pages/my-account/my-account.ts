import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { EditProfileModalPage } from '../edit-profile-modal/edit-profile-modal';
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

  userId: any = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController, public actionSheetCtrl: ActionSheetController) {
  }

  editprofile() {
    let profileModal = this.modalController.create(EditProfileModalPage, { userId: this.userId });
    profileModal.present();
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }

}
