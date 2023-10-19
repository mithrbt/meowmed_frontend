import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {CustomerRegisterComponent} from "./customer-register/customer-register.component";

const routes: Routes = [
  {path: 'kunden', component: CustomerListComponent},
  {path: 'register', component: CustomerRegisterComponent},
  {path: '', redirectTo: 'kunden', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
