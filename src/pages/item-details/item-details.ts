import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MessagingPage } from '../messaging/messaging';
import { AuthProvider } from '../../auth/auth.provider';
import { UiProvider } from '../../providers/ui.provider';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/forkJoin';
import { CallNumber } from '@ionic-native/call-number';
import { AdvertismentProvider } from '../../providers/advertisment/advertisment.provider';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  details: any;
  item_id: any;
  images: any;
  optionsValues: any[];

  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public uiProvider: UiProvider,
    public socialSharing: SocialSharing,
    public callNumber: CallNumber,
    public advertismentProvider: AdvertismentProvider
  ) {
    this.item_id = navParams.data.item_id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }

  ionViewCanEnter() {
    return this.getItemDetails();
  }

  show_model() {
  }

  getItemDetails() {
    this.uiProvider.showLoadingPopup('جاري جلب البيانات...');
    Observable.forkJoin(this.advertismentProvider.getAdvertismentDetails(this.item_id), this.advertismentProvider.getOptionsValues())
      .subscribe(
        (result) => {
          this.details = result[0];
          this.optionsValues = result[1].data;
          console.log(this.optionsValues);
          this.uiProvider.hideLoadingPopup();
        },
        (error) => {
          console.log(error);
          this.uiProvider.hideLoadingPopup();
        }
      );
  }

  getOptionValue(optionID) {
    let index = this.optionsValues.findIndex( item => item.id_v == optionID);
    if(index >= 0) {
      return this.optionsValues[index]['value_v_ar'];
    } else {
      return optionID;
    }
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
