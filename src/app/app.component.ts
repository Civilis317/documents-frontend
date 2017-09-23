import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import { Router } from '@angular/router';
import {AuthPubSubService} from './services/auth-pub-sub.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title: string = 'Correspondence Module';
  private authenticated: boolean = false;
  private dummy: number;
  
  constructor(private router: Router, private loginService: LoginService, private authPubSubService: AuthPubSubService) { }
  
  ngOnInit(): void {
    this.authPubSubService.Dummy.subscribe(
      (dummy: number) => this.dummy = dummy,
       (err) => console.error('error in DummyPubSub service'),
        () => console.log('Complete')
    );
    
    this.authPubSubService.Authenticated.subscribe(
        (authenticated: boolean) => this.authenticated = authenticated,
        (err) => console.error('error in AuthPubSubService'),
        () => console.log('Complete')
     );
    
    let authToken: string = localStorage.getItem('authToken');
    if (authToken) {
      this.authenticated = true;
      console.log(`Token: ${authToken}`)
    } else {
      this.authenticated = false;
    }
    
    console.log(`Authenticated: ${this.authenticated}`)
  }

  logout() {
    this.loginService.logout(localStorage.getItem('authToken'));
    localStorage.removeItem('authToken');
    this.authenticated = false;
    this.router.navigate(['/']);
  }

}
