import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ShowroomProvider } from '../../providers/showroom/showroom';
import { UiProvider } from '../../providers/ui.provider';
import * as moment from 'moment';
import { SearchProvider } from '../../providers/search/search.provider';
import { config } from '../../config';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { AuthProvider } from '../../auth/auth.provider';
import { MessagingPage } from '../messaging/messaging';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-showroom',
  templateUrl: 'showroom.html',
})
export class ShowroomPage {
  assetBaseurl = config.assetsBaseUrl;
  liked: boolean = false;
  showroomId: any;
  showroomInfo: any;
  years: any[] = [];
  types: any[];
  models: any[];
  canLoadMore: boolean = false;

  searchFilters: any = {
    showroom: null,
    type: null,
    model: null,
    yearFrom: null
  };

  searchRoomItems: any[] = [];
  seachReequestSent: boolean = false;
  metaDataLoaded: boolean = false;
  isSearching: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public showroomProvider: ShowroomProvider,
    public uiProvider: UiProvider,
    public searchProvider: SearchProvider,
    public socialSharing: SocialSharing, 
    public callNumber: CallNumber,
    public authProvider: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    this.showroomId = this.navParams.data.showroomId;
    
    this.getShowroom();
    this.getSelectOptions();
  }

  public toggleLike() {
    this.liked = !this.liked;
  }

  getShowroom() {
    this.uiProvider.showLoadingPopup('جاري جلب البيانات');
    this.showroomProvider.getShowroom(this.showroomId)
      .subscribe(
        (result) => {
          this.uiProvider.hideLoadingPopup();
          this.showroomInfo = result.data;
          this.searchFilters.showroom = this.showroomInfo.id_s;
          this.searchInShowroom(5,0);
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
        }
      );
  }

  getSelectOptions() {
    this.showroomProvider.getCarTypesAndModels()
      .subscribe(
        (result) => {
          this.types = result.data;
          this.models = result.data;
          this.metaDataLoaded = true;
        },
        (error) => {
          this.uiProvider.showToastMessage(error.json().error.message);
        }
      );
    let startYear = Number(moment().subtract('50', 'years').format('YYYY'));
    for (let index = 0; index <= 50; index++) {
      this.years.push(startYear + index);
    }
  }

  searchInShowroom(limit, skip) {
    //Clear previous results when searching 
    if(skip == 0) {
      this.searchRoomItems = [];
    }
    this.isSearching = true;
    this.uiProvider.showLoadingPopup('جاري جلب البيانات');
    this.searchProvider.searchInShowroom(this.searchFilters, limit, skip)
      .subscribe(
        (result) => {
          this.uiProvider.hideLoadingPopup();
          this.searchRoomItems.push(...result.data);
          (result.data.length == limit) ? this.canLoadMore = true : this.canLoadMore = false;
          this.seachReequestSent = true;
          this.isSearching = false;
        },
        (error) => {
          this.uiProvider.hideLoadingPopup();
          this.seachReequestSent = true;
          this.isSearching = false;
        }
      );
  }

  showMore() {
    this.searchInShowroom(5, this.searchRoomItems.length);
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
      url: `http://automark.ae/cars/index/showsid/${this.showroomInfo.id_s}`,
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

}
