import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
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
import { ShowroomsPage } from '../pages/showrooms/showrooms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { RestProvider } from '../providers/rest/rest';
import { AuthProvider } from '../auth/auth.provider';
import { UiProvider } from '../providers/ui.provider';
import { HttpProvider } from '../providers/http.provider';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { ShowroomProvider } from '../providers/showroom/showroom';
import { SearchProvider } from '../providers/search/search.provider';
import { TopHeaderComponent } from '../components/top-header.component';
import { ImageProvider } from '../providers/image.provider';
import { MessagingPage } from '../pages/messaging/messaging';
import {Keyboard}  from '@ionic-native/keyboard';
import { SafePipe } from '../pipes/safe.pipe';
import { AdvertismentProvider } from '../providers/advertisment/advertisment.provider';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { SelectsOptionsProvider } from '../providers/select-options.provider';


@NgModule({
  declarations: [
    SafePipe,
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
    ShowroomsPage,
    EditProfileModalPage,
    TopHeaderComponent,
    MessagingPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicImageViewerModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      platforms: {
        ios: {
          statusbarPadding: true,
          tabsHideOnSubPages: true
        }
      }
    })
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
    ShowroomsPage,
    LoginPage,
    EditProfileModalPage,
    MessagingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    Keyboard,
    FilePath,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpProvider,
    RestProvider,
    AuthProvider,
    UiProvider,
    RestProvider,
    ShowroomProvider,
    ImageProvider,
    AdvertismentProvider,
    SocialSharing,
    CallNumber,
    SearchProvider,
    SelectsOptionsProvider
  ]
})
export class AppModule { }
