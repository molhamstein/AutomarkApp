import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { config } from '../config';
import { AuthProvider } from '../auth/auth.provider';

@Injectable()
export class HttpProvider {

  /*----------------------
  * Class Memeber
  ---------------------- */
  private langStorageKey = 'Accept-Language';
  private access_token: string;
  private lang: string;
  private baseUrl = config.baseUrl;

  constructor(
    private http: Http,
    private authProvider: AuthProvider
    ) {}

  /*----------------------
  * Public Methods
  ---------------------- */
  get(action: any) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.get(this.baseUrl + action, {
      headers: headers
    })
    .map(res => res.json());
  }

  post(action: any, data: any) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + action, data, {
      headers: headers
    })
    .map( res => res.json());
    
  }

  update(action: any, data: any, id: any) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);

    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUrl + action + '/' + id, data, {
      headers: headers
    })
    .map(res => res.json());

  }

  delete(action: any, id: any) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.delete(this.baseUrl + action + '/' + id, {
      headers: headers
    })
    .map(res => res.json());
  }

  /*----------------------
  * Private Methods
  ---------------------- */
  private createAuthorizationHeader(headers: Headers) {
    let authInfo = this.authProvider.getAuthInfo();
    if(authInfo != null) {
        this.access_token = authInfo.id;
        headers.append('Authorization', this.access_token);
    }
  }

}
