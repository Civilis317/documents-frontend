import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthPubSubService {
  Authenticated: Subject<boolean>;
  Dummy: Subject<number>;

  constructor() { 
    this.Authenticated = new Subject();
    this.Dummy = new Subject();
  }

}
