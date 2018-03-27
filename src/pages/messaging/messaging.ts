import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UiProvider } from '../../providers/ui.provider';

@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
})
export class MessagingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public uiProvider: UiProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagingPage');
    this.uiProvider.showLoadingPopup("انتظر قليلاً من فضلك");
  }



}
