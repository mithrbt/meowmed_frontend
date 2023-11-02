import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Vertrag} from "../vertrag";
import {VertragService} from "../vertrag.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{

  id!: number;
  customer: Customer = new Customer();
  vertraege: Vertrag[] = [];

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private vertragService: VertragService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    });
    this.getVertragList();
  }

  private getVertragList(){
    this.vertragService.getVertragList(this.id).subscribe(data =>{
      this.vertraege = data;
      console.log("Verträge:");
      console.log(this.vertraege);
    });
  }


  createContract(id: number){
    this.router.navigate(['vertrag', id]);
  }
}
