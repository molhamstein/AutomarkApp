import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UiProvider } from '../../providers/ui.provider';
import { AuthProvider } from '../../auth/auth.provider';

@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
})
export class MessagingPage {

  src;
  isRefreshed = false;
  userId;
  targetId;
  constructor(public navCtrl: NavController, public navParams: NavParams, public uiProvider: UiProvider, public authProvider: AuthProvider) { }

  ionViewDidLoad() {
    let authInfo = this.authProvider.getAuthInfo();
    this.userId = authInfo.userId;
    this.targetId = this.navParams.data.targetId;
    if (this.targetId != null) {
      this.src = `http://automark.ae/arrowchat/public/mobile/?userid=${this.userId}&targetid=${this.targetId}`;
    } else {
      this.src = `http://automark.ae/arrowchat/public/mobile/?userid=${this.userId}`;
    }

    this.uiProvider.showLoadingPopup("انتظر قليلاً من فضلك");
  }

  refreshIframe() {
    if (this.targetId != null) {
      if (this.isRefreshed == false) {
        this.src = '';
          this.src = `http://automark.ae/arrowchat/public/mobile/?userid=${this.userId}&targetid=${this.targetId}&random=` + (new Date()).getTime();
        this.isRefreshed = true;
      } else {
        this.uiProvider.hideLoadingPopup();
      }
    } else {
      this.uiProvider.hideLoadingPopup();
    }
  }
}
