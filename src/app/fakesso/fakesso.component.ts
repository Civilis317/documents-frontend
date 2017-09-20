import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthPubSubService} from '../services/auth-pub-sub.service';

@Component({
  selector: 'app-fakesso',
  templateUrl: './fakesso.component.html',
  styleUrls: ['./fakesso.component.css']
})
export class FakessoComponent implements OnInit {
  jwt: string;

  constructor(private router: Router, private authPubSubService: AuthPubSubService) { }

  ngOnInit() {
  }
  
  setToken() {
    localStorage.setItem('authToken', this.jwt);
    this.authPubSubService.Authenticated.next(true);
    this.router.navigate(['/documentlist']);
  }

}
