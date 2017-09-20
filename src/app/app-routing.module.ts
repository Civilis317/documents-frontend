/*
* app-routing.module.ts
*/
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FakessoComponent} from './fakesso/fakesso.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { ResponseComponent } from './response/response.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'fake-sso', component: FakessoComponent},
  {path: 'createResponse', component: ResponseComponent},
  {path: 'documentlist', component: DocumentlistComponent},
  {path: 'documentlist/:token', component: DocumentlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
