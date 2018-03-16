import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SearchFilterPage } from '../search-filter/search-filter';
import { MyAccountPage } from '../my-account/my-account';
import { MobileNumbersPage } from '../mobile-numbers/mobile-numbers';

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


  ShowFilter(){
    this.navCtrl.push(SearchFilterPage);
  }

  ShowMyAccount(){
     this.navCtrl.push(MyAccountPage);
  } 
}
