import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'; // for ngModel!
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

// routing module
import {AppRoutingModule} from './app-routing.module';

// services
import {LoginService} from './services/login.service';
import {DocumentService} from './services/document.service';
import {AuthPubSubService} from './services/auth-pub-sub.service';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FakessoComponent } from './fakesso/fakesso.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { ResponseComponent } from './response/response.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, LoginComponent, FakessoComponent, DocumentlistComponent, ResponseComponent],
  providers: [LoginService, DocumentService, AuthPubSubService],
  bootstrap: [AppComponent]
})
  
export class AppModule { }
