import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthPubSubService} from '../services/auth-pub-sub.service';

@Component({
  selector: 'app-fakesso',
  templateUrl: './fakesso.component.html',
  styleUrls: ['./fakesso.component.css']
})
export class FakessoComponent implements OnInit {
  jwt: string;
  private showLoginSection: boolean = true;
  
  constructor(private router: Router, private authPubSubService: AuthPubSubService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe((param: any) => {
      this.showLoginSection = true;
      let id: number = parseInt(param.id);
      console.log(id)
    });
  }
  
  setToken() {
    localStorage.setItem('authToken', this.jwt);
    this.authPubSubService.Authenticated.next(true);
    this.showLoginSection = false;
    this.router.navigate(['/documentlist']);
  }
  
  hideSection() {
    this.showLoginSection = false;
    this.authPubSubService.Dummy.next(Date.now());
  }
  
}
