import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  login(username: string, password: string): Promise<string> {
    const url: string = `${environment.alfresco_client_url}/login`;
    let data = `{"username": "${username}", "password": "${password}" }`;
    
    return this.http.post(url, data)
      .toPromise()
      .then(response => response.headers.get("Authorization"))
      .catch(this.handleError);
  }
  
  logout(token: string): Promise<string> {
    const url = `${environment.alfresco_client_url}/destroy-session`;
    let options = new RequestOptions({
      headers: new Headers({
        'Authorization': `${token}`
      })
    });
    
    return this.http.post(url, null, options )
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
