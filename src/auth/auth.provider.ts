import { Injectable } from '@angular/core';
import { config } from '../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthProvider {
    authInfo: any;
    isAuth : Subject<boolean> = new BehaviorSubject<boolean>(null);
    constructor(public http: Http) {
        console.log('Hello RestProvider Provider');
    }

    login(loginModel): Observable<any> {
        return this.http.post(config.baseUrl + 'users/login',loginModel)
            .map(res => res.json())
            .catch(this.handleError);
    }
    register(registerModel) {
        return this.http.post(config.baseUrl + 'users', registerModel)
            .map( res => res.json())
            .catch(this.handleError);
    }
    setAuthInfo(data) {
        this.authInfo = data;
        localStorage.setItem('authInfo', JSON.stringify(this.authInfo));
        this.isAuth.next(true);
    }

    getAuthInfo() {
        if (localStorage.getItem("authInfo") != null) {
            return JSON.parse(localStorage.getItem("authInfo"));
        } else {
            return null;
        }
    }
    isLoggedIn() {
        if (localStorage.getItem("authInfo") != null) {
            this.isAuth.next(true);
            return true;
        } else {
            this.isAuth.next(true);
            return false;
        }
    }
    logout() {
        localStorage.clear();
        this.isAuth.next(false);
    }
    public handleError(error: Response) {
        return Observable.throw(error.json());
    }
}
