import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UiProvider } from '../../providers/ui.provider';
import { AuthProvider } from '../../auth/auth.provider';
import * as $ from 'jquery'

@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
})
export class MessagingPage {

  src;
  isRefreshed = false;
  refreshCount=0;
  userId;
  targetId;
  canLoadFrame = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public uiProvider: UiProvider, public authProvider: AuthProvider) { }
  ionViewWillEnter() {
    // this.uiProvider.showLoadingPopup("انتظر قليلاً من فضلك");
    // let authInfo = this.authProvider.getAuthInfo();
    // this.userId = authInfo.userId;
    // this.targetId = this.navParams.data.targetId;
    // this.src = '';
    // if (this.targetId != null) {
    //   this.src = `http://automark.ae/arrowchat/public/mobile/?userid=${this.userId}&targetid=${this.targetId}&random=` + (new Date()).getTime();
    //   let iFrame: any = `<iframe src="${this.src}" id="chatIframe" class="messaging-frame" frameborder="0" name="${Date.now()}"></iframe>`;
    //   // $('#messaging-container').remove();
    //   $('#messaging-container').append(iFrame);
    // } else {
    //   this.src = `http://automark.ae/arrowchat/public/mobile/?userid=${this.userId}`;
    //   let iFrame: any = `<iframe src="${this.src}" id="chatIframe" class="messaging-frame" frameborder="0" name="${Date.now()}"></iframe>`;
    //   // $('#messaging-container *').remove();
    //   $('#messaging-container').append(iFrame);
    // }
    // console.log(this.src);
    // this.canLoadFrame = true;


  }

  ionViewDidLoad() {
    let authInfo = this.authProvider.getAuthInfo();
    this.userId = authInfo.userId;
    this.targetId = this.navParams.data.targetId;
    if (this.targetId != null) {
      this.src = `http://automark.ae/arrowchat/public/mobile/?userid=${this.userId}&targetid=${this.targetId}`;
    } else {
      this.src = `http://automark.ae/arrowchat/public/mobile/?userid=${this.userId}`;
    }
    this.canLoadFrame = true;
    console.log(this.src);
    this.uiProvider.showLoadingPopup("انتظر قليلاً من فضلك");
  }

  refreshIframe() {
    if (this.targetId != null) {
      if (this.isRefreshed == false) {
        this.src = '';
        this.src = `http://automark.ae/arrowchat/public/mobile/?userid=${this.userId}&targetid=${this.targetId}&random=` + (new Date()).getTime();
        this.refreshCount++;
        if(this.refreshCount == 2) {
          this.isRefreshed = true;
        }

      } else {
        this.uiProvider.hideLoadingPopup();
      }
    } else {
      this.uiProvider.hideLoadingPopup();
    }
  }
  getDate() {
    return Date.now();
  }
}
