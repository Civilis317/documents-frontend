import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DocumentService} from '../services/document.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.css']
})
export class DocumentlistComponent implements OnInit {
  documents: any;
  dateHeaderClass: string;
  nameHeaderClass: string;
  dateSortToggle: number = -1;
  nameSortToggle: number = -1;

  alert = {"error": "", "message": ""};

  constructor(private route: ActivatedRoute, private documentService: DocumentService) {}

  ngOnInit() {
    this.alert.message = "";
    this.route.params.subscribe((param: any) => {
      let token: string = param.token;
      if (!token) {
        token = localStorage.getItem('authToken');
      }

      if (token && token.startsWith('Bearer ')) {
        this.documentService.getDocumentList(token)
          .then((data: any) => {
            this.documents = data;
            this.sortByDate();
          });
      } else {
        this.alert.message = "Please provide valid credentials...";
      }
    });
  }

  downloadDocument(doc: any) {
    let token: string = localStorage.getItem('authToken');
    this.documentService.getDocument(token, doc.docId)
      .then((data: any) => {
        let blob = new Blob([data._body], {type: doc.mimeType});
        let url = window.URL.createObjectURL(blob);

        // create a temporary anchor element to be able to name the downloaded file correctly...
        let a = document.createElement('a');
        a.href = url;
        a.download = doc.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

      });
  }
  
  sortByDate() {
    this.nameHeaderClass = '';
    this.dateSortToggle = -1 * this.dateSortToggle;
    if (this.dateSortToggle == 1) this.dateHeaderClass = 'glyphicon glyphicon-triangle-top';
    if (this.dateSortToggle == -1) this.dateHeaderClass = 'glyphicon glyphicon-triangle-bottom';
    this.documents.sort((a: any, b:any) => {
      return this.dateSortToggle * (new Date(a.modifiedDate).getTime() - new Date(b.modifiedDate).getTime());
    }); 
  }
    
  sortByName() {
    this.dateHeaderClass = '';
    this.nameSortToggle = -1 * this.nameSortToggle;
    if (this.nameSortToggle == 1) this.nameHeaderClass = 'glyphicon glyphicon-triangle-top';
    if (this.nameSortToggle == -1) this.nameHeaderClass = 'glyphicon glyphicon-triangle-bottom';
    this.documents.sort((a: any, b:any) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return this.nameSortToggle * 1; 
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return this.nameSortToggle * -1;
      }
      return 0;
    }); 
  }
  
}
