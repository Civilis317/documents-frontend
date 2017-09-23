import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../services/login.service';
import {AuthPubSubService} from '../services/auth-pub-sub.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  alert = { "error": "", "message": ""};
  private showLoginSection: boolean = true;
  
  constructor(
    private router: Router, 
    private loginService: LoginService, 
    private authPubSubService: AuthPubSubService,
    private route: ActivatedRoute
  ) { }
  
 
  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      this.showLoginSection = true;
      let id: number = parseInt(param.id);
      console.log(id)
    });
  }
  
  performLogin() {
    this.alert.error = "";
    this.alert.message = "";
    let token: string;
    this.loginService.login(this.username, this.password)
      .then((data: string) => {
        if (data && data.startsWith('Bearer ')) {
          localStorage.setItem('authToken', data);
          this.authPubSubService.Authenticated.next(true);
          this.showLoginSection = false;
          this.router.navigate(['/documentlist']);
//          this.router.navigate([`/documentlist/${token}`]);
        } else {
          this.authPubSubService.Authenticated.next(false);
          this.alert.error = "Login failure";
          this.alert.message = "Please provide valid credentials...";
        }
      }
    ).catch( error => {
        this.authPubSubService.Authenticated.next(false);
        this.alert.error = "Login failure";
        this.alert.message = "Please provide valid credentials...";
      }
    );
  }
  
  hideSection() {
    this.showLoginSection = false;
    this.authPubSubService.Dummy.next(Date.now());
  }
    
  hideErrorPanel() {
    this.alert = {"error": "", "message": ""}; 
  }
  
}
