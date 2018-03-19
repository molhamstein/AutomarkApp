import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ShowroomProvider } from '../../providers/showroom/showroom';
import { UiProvider } from '../../providers/ui.provider';

/**
 * Generated class for the ShowroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-showroom',
  templateUrl: 'showroom.html',
})
export class ShowroomPage {
  assetBaseurl = 'http://automark.ae/Public/uploads/thumb/thumb_';

  liked: boolean = false;
  showroomId: any;
  showroomInfo: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public showroomProvider: ShowroomProvider,
    public uiProvider: UiProvider
  ) {
  }

  ionViewDidLoad() {
    this.showroomId = this.navParams.data.showroomId;
    this.getShowroom();
  }

  public toggleLike() {
    this.liked = !this.liked;
  }

  getShowroom() {
    this.uiProvider.showLoadingPopup('جاري جلب البيانات');
    this.showroomProvider.getShowroom(this.showroomId)
      .subscribe(
        (result) => {
          this.showroomInfo = result.data;
          console.log(result);
          this.uiProvider.hideLoadingPopup();
          
          
        }, 
        (error) => {
          this.uiProvider.hideLoadingPopup();
          console.log(error);
        }
      );
  }


}
