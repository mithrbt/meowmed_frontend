import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";
import {Router} from "@angular/router";
import {Address} from "../address";

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit{

  customer : Customer = new Customer();
  address!: Address;

  constructor(private customerService: CustomerService, private router: Router){
  }

  ngOnInit() {
    this.customer.address = new Address();
  }

  saveCustomer(){
    this.customerService.createCustomer(this.customer).subscribe(data =>{
      console.log(data);
      this.customer = data;
      this.goToCustomerDetails();
    },
    error => console.log(error));``
  }

  createCustomer() {
    console.log(this.customer);
    this.saveCustomer();
  }

  goToCustomerDetails(){
    this.router.navigate(['kundendetails', this.customer.id]);
  }
}
