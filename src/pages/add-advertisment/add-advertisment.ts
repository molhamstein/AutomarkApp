import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-add-advertisment',
  templateUrl: 'add-advertisment.html',
})
export class AddAdvertismentPage {

  activeTab = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  setActiveTab(index) {
    this.activeTab = index;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdvertismentPage');
  }
  uploadImage(event) {
    console.log(event.target);
  }
}
