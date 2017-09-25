import {Component, OnInit} from '@angular/core';
import {DocumentService} from '../services/document.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  private subject: string;
  private msg: string;
  alert = {"error": "", "message": ""};
  private payload: FormData[] = [];

  private recipient: any;

  private recipients = [
    {"username": "admin", "displayName": "Administrator"},
    {"username": "jceasar", "displayName": "Julius Ceasar"}
  ];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.recipient = this.recipients[0];
  }

  sendMsg() {
    let token: string = localStorage.getItem('authToken');

    // upload file or send message?
    if (this.payload && this.payload.length > 0) {
      this.payload[0].append('title', JSON.stringify(this.subject));
      this.payload[0].append('description', JSON.stringify(this.msg));

      this.documentService.uploadFile(token, this.payload[0])
        .then((data: string) => {
          this.alert.error = "ok";
          this.alert.message = "The File has been uploaded";
        }).catch((error: any) => {
          this.alert.error = "error";
          this.alert.message = error;
        });
      
      
      
    } else {
      this.documentService.sendMsg(token, this.recipient.username, this.subject, this.msg)
        .then((data: string) => {
          this.alert.error = "ok";
          this.alert.message = "The Message has been sent";
        });
    }
  }

  uploadFile(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      Array.from(fileList).forEach(f => this.addFileToPayload(f));
    }
  }

  private addFileToPayload(file: File) {
    console.log(`filename: ${file.name}`)
    let formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    this.payload.push(formData);
  }

}
