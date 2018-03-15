import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchResultPage } from '../pages/search-result/search-result';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { SearchFilterPage } from '../pages/search-filter/search-filter';
import { MyAccountPage } from '../pages/my-account/my-account';
import { MobileNumbersPage } from '../pages/mobile-numbers/mobile-numbers';
import { AddAdvertismentPage } from '../pages/add-advertisment/add-advertisment';
import { EditProfileModalPage } from '../pages/edit-profile-modal/edit-profile-modal';
import { ShowroomPage } from '../pages/showroom/showroom';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 


import { RestProvider } from '../providers/rest/rest';
import { AuthProvider } from '../auth/auth.provider';
import { UiProvider } from '../providers/ui.provider';
import { HttpProvider } from '../providers/http.provider';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchResultPage,
    SearchFilterPage,
    ItemDetailsPage,
    MyAccountPage,
    MobileNumbersPage,
    AddAdvertismentPage,
    ShowroomPage,
    LoginPage,
    EditProfileModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchResultPage,
    SearchFilterPage,
    ItemDetailsPage,
    MyAccountPage,
    MobileNumbersPage,
    AddAdvertismentPage,
    ShowroomPage,
    LoginPage,
    EditProfileModalPage
     
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    RestProvider,
    AuthProvider,
    UiProvider
    
  ]
})
export class AppModule { }
