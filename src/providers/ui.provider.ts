import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class UiProvider {
    loadingPopup;
    constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController) { }


    showLoadingPopup(message) {
        this.loadingPopup = this.loadingCtrl.create({
            content: message
        });

        this.loadingPopup.present();
    }

    hideLoadingPopup() {
        this.loadingPopup.dismiss();
    }

    showToastMessage(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }
}
