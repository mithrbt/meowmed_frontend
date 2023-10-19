import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit{
  constructor(private customerService: CustomerService){
  }
  customer: Customer = {
    id: 0,
    firstname: '',
    lastname: '',
    address: ''
  };
  ngOnInit(): void{
    this.createCustomer();
  }
  createCustomer(){
    this.customerService.createCustomer();
  }
}
