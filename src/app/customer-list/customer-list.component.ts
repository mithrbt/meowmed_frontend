import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer'
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{

  customers: Customer[] = [];

  constructor(private customerService: CustomerService){
  }

  ngOnInit(): void{
    this.getCustomerList();
  }
  private getCustomerList(){
    this.customerService.getCustomerList().subscribe(data =>{
      this.customers = data;
    })
  }
}
