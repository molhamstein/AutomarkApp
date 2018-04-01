import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MessagingPage } from '../messaging/messaging';
import { AuthProvider } from '../../auth/auth.provider';
import { UiProvider } from '../../providers/ui.provider';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  details: any;
  item_id: any;
  images: any;

  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public uiProvider: UiProvider,
    public socialSharing: SocialSharing, 
    public callNumber: CallNumber
  ) {
    this.item_id = navParams.data.item_id;
    console.log(this.item_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }

  ionViewCanEnter() {
    return this.getitem_details();
  }

  show_model() {
  }

  getitem_details() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'جاري جلب البيانات ....'
    });

    // Show the popup
    loadingPopup.present();
    return this.restProvider.getitem_details(this.item_id)
      .then(data2 => {
        this.details = data2;
        console.log(data2);
        //this.images = JSON.parse("[" + data2.data.images_c + "]"); 
        loadingPopup.dismiss();
        //console.log(data2.data[0].id_c);            
      });
  }

  sendMessage(userID) {
    if (this.authProvider.isLoggedIn()) {
      this.navCtrl.push(MessagingPage, { targetId: userID });
    } else {
      this.uiProvider.showToastMessage('من فضلك قم بتسجيل الدخول أولاً');
    }

  }

  share() {
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      url: `http://automark.ae/cars/index/id/${this.item_id}`,
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }

    this.socialSharing.shareWithOptions(options)
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  callUser() {
    this.callNumber.callNumber(this.details.data[0].users.mobile_u, false)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
