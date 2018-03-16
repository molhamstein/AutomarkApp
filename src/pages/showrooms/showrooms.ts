import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowroomPage } from '../showroom/showroom';

/**
 * Generated class for the ShowroomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-showrooms',
  templateUrl: 'showrooms.html',
})
export class ShowroomsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowroomsPage');
  }
  openShowroomPage() {
    this.navCtrl.push(ShowroomPage);
  }

}
