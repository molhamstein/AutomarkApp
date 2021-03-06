import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowroomPage } from '../showroom/showroom';
import { ShowroomProvider } from '../../providers/showroom/showroom';
import { UiProvider } from '../../providers/ui.provider';
import { config } from '../../config';

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
  
  showRooms: any[] = [];
  canLoadMore: boolean = false;
  assetBaseurl = 'http://automark.ae/Public/uploads/thumb/thumb_';
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public showroomProvider: ShowroomProvider,
    public uiProvider: UiProvider 
  ) {
  }
  
  ionViewDidLoad() {
    this.getShowrooms(3, 0);
  }

  getShowrooms(limit, skip) {
    let filters = { limit: limit, skip: skip };
    this.uiProvider.showLoadingPopup('جاري جلب البيانات');
    this.showroomProvider.getShowrooms(filters)
      .subscribe(
        (result) => {
          this.uiProvider.hideLoadingPopup();
          this.showRooms.push(...result.data);
          (result.data.length < limit) ? this.canLoadMore = false: this.canLoadMore = true;
        },
        (error) => {
          this.uiProvider.showToastMessage(error.message);
          this.uiProvider.hideLoadingPopup();
        }
      );
  }

  openShowroomPage(id) {
    this.navCtrl.push(ShowroomPage, {showroomId: id});
  }

}