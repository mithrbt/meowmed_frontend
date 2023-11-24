import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from "@angular/material/icon";
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CreateVertragdashboardComponent } from './create-vertragdashboard/create-vertragdashboard.component';
import {MatTableModule} from "@angular/material/table";
import { VertragDetailsComponent } from './vertrag-details/vertrag-details.component';
import { UpdateVertragComponent } from './update-vertrag/update-vertrag.component';
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {DatePipe} from "@angular/common";
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerRegisterComponent,
    CustomerDetailsComponent,
    UpdateCustomerComponent,
    CreateVertragdashboardComponent,
    VertragDetailsComponent,
    UpdateVertragComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        FileUploadModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTableModule,
        MatSelectModule,
        MatButtonToggleModule,
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
