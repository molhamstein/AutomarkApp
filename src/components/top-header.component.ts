import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NavController,LoadingController, Nav  } from 'ionic-angular';
import { AuthProvider } from '../auth/auth.provider';
import { LoginPage } from '../pages/login/login';

@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
})
export class TopHeaderComponent {
    @ViewChild(Nav) nav: Nav;
  loginStatus;
  constructor(public authProvider: AuthProvider) {
  	authProvider.isAuth.subscribe(
      (result) => {
        if(result == null) {
          this.loginStatus = this.authProvider.isLoggedIn();
        } else {
          this.loginStatus = result;
        }
      }
    );
  }   

  ionViewDidLoad() {  
  }

  login(){
    // this.nav.push(LoginPage);
    console.log("hi");
  }
}
