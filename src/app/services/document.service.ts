import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class DocumentService {

  constructor(private http: Http) {}

  getDocument(token: string, docId: string): Promise<any> {
    let url: string = environment.alfresco_client_url + '/document/' + docId;
    let options = new RequestOptions({
      headers: new Headers({
        'Authorization': `${token}`
      })
    });
    
    options.responseType = ResponseContentType.Blob;
    
    return this.http.get(url, options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);

  }

  getDocumentList(token: string): Promise<any> {
    console.log(`token: ${token}`)
    let url: string = environment.alfresco_client_url + '/documents/';
    let options = new RequestOptions({
      headers: new Headers({
        'Authorization': `${token}`
      })
    });

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  
  sendMsg(token: string, recipient: string, subject: string, msgBody: string): Promise<string> {
    let url = environment.alfresco_client_url + '/send-message';
    let options = new RequestOptions({
      headers: new Headers({
        'Authorization': `${token}`
      })
    });
    let data = {"sender": "", "recipient": "", "subject": "", "msgBody": ""};
    data.recipient = recipient;
    data.subject = subject;
    data.msgBody = msgBody;
    return this.http.post(url, data, options )
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
