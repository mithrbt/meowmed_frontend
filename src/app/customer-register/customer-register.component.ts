import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit{
  constructor(private customerService: CustomerService){
  }

  ngOnInit(): void{
    this.setCustomerRegistered();
  }
  private setCustomerRegistered(){
    this.customerService.setCustomer();
  }
}
