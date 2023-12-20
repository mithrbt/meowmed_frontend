import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {CustomerRegisterComponent} from "./customer-register/customer-register.component";
import {CustomerDetailsComponent} from "./customer-details/customer-details.component";
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";
import {CreateVertragdashboardComponent} from "./create-vertragdashboard/create-vertragdashboard.component";
import {VertragDetailsComponent} from "./vertrag-details/vertrag-details.component";
import {UpdateVertragComponent} from "./update-vertrag/update-vertrag.component";

const routes: Routes = [
  {path: 'kunden', component: CustomerListComponent},
  {path: 'register', component: CustomerRegisterComponent},
  {path: '', redirectTo: 'kunden', pathMatch: 'full'},
  {path: 'kundendetails/:id', component: CustomerDetailsComponent},
  {path: 'update-kunde/:id', component: UpdateCustomerComponent},
  {path: 'vertrag/:id', component: CreateVertragdashboardComponent},
  {path: 'vertragdetails/:id', component: VertragDetailsComponent},
  {path: 'update-vertrag/:id', component: UpdateVertragComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
