import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {CustomerRegisterComponent} from "./customer-register/customer-register.component";
import {CustomerDetailsComponent} from "./customer-details/customer-details.component";
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";
import {CreateVertragdashboardComponent} from "./create-vertragdashboard/create-vertragdashboard.component";

const routes: Routes = [
  {path: 'kunden', component: CustomerListComponent},
  {path: 'register', component: CustomerRegisterComponent},
  {path: '', redirectTo: 'kunden', pathMatch: 'full'},
  {path: 'kundendetails/:id', component: CustomerDetailsComponent},
  {path: 'update-kunde/:id', component: UpdateCustomerComponent},
  {path: 'vertrag', component: CreateVertragdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
