import { Injectable } from '@angular/core';
import { config } from '../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpProvider } from '../providers/http.provider';

@Injectable()
export class AuthProvider {
    access_token: any;
    authInfo: any;
    isAuth: Subject<boolean> = new BehaviorSubject<boolean>(null);
    constructor(public http: Http) {
        console.log('Hello RestProvider Provider');
    }

    login(loginModel): Observable<any> {
        return this.http.post(config.baseUrl + 'users/login', loginModel)
            .map(res => res.json())
            .catch(this.handleError);
    }
    register(registerModel) {
        return this.http.post(config.baseUrl + 'users', registerModel)
            .map(res => res.json())
            .catch(this.handleError);
    }
    getUserDetails(userID): Observable<any> {
        return this.http.get(config.baseUrl + `users/${userID}`)
            .map(res => res.json())
            .catch(this.handleError);
    }
    editUserInfo(userInfoModel: any): Observable<any> {
        return this.http.put(config.baseUrl + `users/${userInfoModel.id_u}`, userInfoModel)
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
            this.isAuth.next(false);
            return false;
        }
    }
    logout() {
        localStorage.clear();
        this.isAuth.next(false);
    }

    private createAuthorizationHeader(headers: Headers) {
        let authInfo = this.getAuthInfo();
        if (authInfo != null) {
            this.access_token = authInfo.id;
            headers.append('Authorization', this.access_token);
        }
    }
    public handleError(error: Response) {
        return Observable.throw(error.json());
    }
}
