import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../services/document.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  private subject: string;
  private msg: string;
  alert = { "error": "", "message": ""};
  
  private recipient:any;
  
  private recipients = [
    {"username": "admin", "displayName": "Administrator"},
    {"username": "jceasar", "displayName": "Julius Ceasar"}
  ];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.recipient = this.recipients[0];
  }
  
  sendMsg() {
    let token: string = localStorage.getItem('authToken');
    this.documentService.sendMsg(token,this.recipient.username, this.subject, this.msg)
          .then((data: string) => {
            console.log(data);
            this.alert.error = "Ok.";
            this.alert.message = "The Message has been sent";
          });
  }

}
