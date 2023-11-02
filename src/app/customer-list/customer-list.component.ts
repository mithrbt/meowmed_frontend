import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer'
import { CustomerService } from '../customer.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{

  customers: Customer[] = [];
  customer: Customer = new Customer();


  constructor(private customerService: CustomerService, private router: Router){
  }

  ngOnInit(): void{
    this.getCustomerList();
  }

  private getCustomerList(){
    this.customerService.getCustomerList().subscribe(data =>{
      this.customers = data;
    });
  }

  deleteCustomer(event: any, id: number){
    if(confirm('Sind Sie sicher, dass Sie den Kunden löschen möchten?')){
      event.target.innerText = "Löschen...";

      this.customerService.deleteCustomer(id).subscribe((response:any) => {
        this.getCustomerList();
        alert("Der Kunde wurde erfolgreich gelöscht.");
      });
    }
  }

  customerDetails(id: number){
    this.router.navigate(['kundendetails', id]);
  }

  updateCustomer(id: number){
    this.router.navigate(['update-kunde', id]);
  }

}
