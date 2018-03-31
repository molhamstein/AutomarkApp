import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MessagingPage } from '../messaging/messaging';
import { AuthProvider } from '../../auth/auth.provider';
import { UiProvider } from '../../providers/ui.provider';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  details:any;
  item_id:any;
  images:any;

  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private loadingCtrl: LoadingController, public authProvider: AuthProvider, public uiProvider: UiProvider) {
    this.item_id= navParams.data.item_id;
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }

  ionViewCanEnter(){

        return this.getitem_details();
   }


   show_model(){  
    
   }

   getitem_details(){
     let loadingPopup = this.loadingCtrl.create({
      content: 'جاري جلب البيانات ....'
    });
  
    // Show the popup
    loadingPopup.present();
    return  this.restProvider.getitem_details(this.item_id)
    .then(data2 => { 
      this.details = data2;
      console.log(data2); 
      //this.images = JSON.parse("[" + data2.data.images_c + "]"); 
      loadingPopup.dismiss();
      //console.log(data2.data[0].id_c);            
    }); 
   }

   sendMessage(userID) {
     if(this.authProvider.isLoggedIn()) {
      this.navCtrl.push(MessagingPage, {targetId: userID});
     } else {
      this.uiProvider.showToastMessage('من فضلك قم بتسجيل الدخول أولاً');
     }
     
   }
}
       