import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthPubSubService {
  Authenticated: Subject<boolean>;

  constructor() { 
    this.Authenticated = new Subject();
  }

}
