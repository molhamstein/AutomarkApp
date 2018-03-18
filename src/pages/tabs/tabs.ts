import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SearchFilterPage } from '../search-filter/search-filter';
import { MyAccountPage } from '../my-account/my-account';
import { MobileNumbersPage } from '../mobile-numbers/mobile-numbers';
import { LoginPage } from '../login/login';
import { AddAdvertismentPage } from '../add-advertisment/add-advertisment';
import { ShowroomsPage } from '../showrooms/showrooms';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tabphoneRoot = MobileNumbersPage; 

  constructor(public navCtrl: NavController) {

  }


 

}
