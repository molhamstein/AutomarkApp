import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav, PlatformConfigToken } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SearchFilterPage } from '../pages/search-filter/search-filter';
import { LoginPage } from '../pages/login/login';
import { TopHeaderComponent } from '../components/top-header.component';
import { SearchResultPage } from '../pages/search-result/search-result';
import { MyAccountPage } from '../pages/my-account/my-account';
import { AddAdvertismentPage } from '../pages/add-advertisment/add-advertisment';
import { ShowroomsPage } from '../pages/showrooms/showrooms';
import { ContactPage } from '../pages/contact/contact';
import { MobileNumbersPage } from '../pages/mobile-numbers/mobile-numbers';
import { AuthProvider } from '../auth/auth.provider';
import { MessagingPage } from '../pages/messaging/messaging';
import { Keyboard } from '@ionic-native/keyboard';
import { UiProvider } from '../providers/ui.provider';

declare var cordova: any;
declare var window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') navCtrl: NavController;
  rootPage: any = ContactPage;
  loginStatus;
  headerHasExtraMargin: boolean = false;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authProvider: AuthProvider, public keyboard: Keyboard, public uiProvider: UiProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();

      window.addEventListener('keyboardWillShow', (ev) => {
        // Describe your logic which will be run each time keyboard is closed.
        if (platform.is('ios')) {
          if (this.headerHasExtraMargin == false) {
            this.headerHasExtraMargin = true;
          }
        }
      });
      splashScreen.hide();
      keyboard.disableScroll(true);

      // keyboad.disableScroll(false); 
    });

    authProvider.isAuth.subscribe(
      (result) => {
        if (result == null) {
          this.loginStatus = this.authProvider.isLoggedIn();
        } else {
          this.loginStatus = result;
        }
      }
    );

  }

  openLoginPage() {
    console.log("hto");
  }


  login() {
    if (this.navCtrl.getActive().component != LoginPage) {
      console.log(this.navCtrl.getActive());
      this.navCtrl.push(LoginPage);
    }
  }

  ShowFilter() {
    if (this.navCtrl.getActive().component != SearchFilterPage) {
      this.navCtrl.push(SearchFilterPage);
    }

  }

  ShowMyAccount() {
    if (this.authProvider.isLoggedIn() == true) {
      if (this.navCtrl.getActive().component != MyAccountPage) {
        let userId = this.authProvider.getAuthInfo().userId;
        this.navCtrl.push(MyAccountPage, { userId: userId });
      }
    } else {
      if (this.navCtrl.getActive().component != LoginPage) {
        this.navCtrl.push(LoginPage);
      }
    }
  }

  add_ad() {
    if (this.navCtrl.getActive().component != AddAdvertismentPage) {
      this.navCtrl.push(AddAdvertismentPage);
    }
  }

  showroom() {
    if (this.navCtrl.getActive().component != AddAdvertismentPage) {
      this.navCtrl.push(ShowroomsPage);
    }
  }

  homePage() {
    if (this.navCtrl.getActive().component != ContactPage) {
      this.navCtrl.push(ContactPage);
    }
  }
  mobileNumbers() {
    if (this.navCtrl.getActive().component != MobileNumbersPage) {
      this.navCtrl.push(MobileNumbersPage);
    }
  }
  openSearchResultPage(catID) {
    this.navCtrl.push(SearchResultPage, { cat_id: catID });
  }
  messaging() {
    if(this.authProvider.isLoggedIn()) {
      this.navCtrl.push(MessagingPage);
    } else {
      this.uiProvider.showToastMessage('من فضلك قم بتسجيل الدخول أولاً');
    }
  }
}
