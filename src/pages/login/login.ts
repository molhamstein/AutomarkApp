import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../auth/auth.provider';
import { UiProvider } from '../../providers/ui.provider';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginModel = {
    email: '',
    password: ''
  };

  registerModel = {
    username: '',
    email_u: '',
    password: '',
    group_u: 1,
    emailVerified: true,
    mobile_u: '',
    lastnews_u: 0,
    image_u: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public uiProvider: UiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(form) {
    if (form.valid) {
      this.uiProvider.showLoadingPopup('جاري تسجيل الدخول')
      this.authProvider.login(this.loginModel)
        .subscribe(
          (result) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage('تم تسجيل الدخول بنجاح');
            this.authProvider.setAuthInfo(result.data);
            this.navCtrl.popToRoot();
          },
          (error) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage(error.error.message);
          }
        );
    } else {
      this.uiProvider.showToastMessage('تأكد من صحة جميع الحقول')
    }
  }

  register(form) {
    if (form.valid) {
      this.uiProvider.showLoadingPopup('جاري تسجيل الدخول')
      this.authProvider.register(this.registerModel)
        .subscribe(
          (result) => {
            this.loginModel.email = this.registerModel.email_u;
            this.loginModel.password = this.registerModel.password;
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage('تم انشاء الحساب بنجاح');
            this.login({valid: true});            
          },
          (error) => {
            this.uiProvider.hideLoadingPopup();
            this.uiProvider.showToastMessage(error.error.message);
          }
        );
    } else {
      this.uiProvider.showToastMessage('تأكد من صحة جميع الحقول')
    }
  }

  // Helper Methods
  changeAccountType(accountType, event) {
    event.preventDefault();
    event.stopPropagation();
    switch (accountType) {
      case 1:
        if (this.registerModel.group_u != 1) {
          this.registerModel.group_u = 1;
        }
        break;
      case 2:
        if (this.registerModel.group_u != 2) {
          this.registerModel.group_u = 2;
        }
        break;
      default:
      this.registerModel.group_u = 1;
        break;
    }
  }

  
  // "username":"MolTemp25",
  // "password": "123456"

  
}
