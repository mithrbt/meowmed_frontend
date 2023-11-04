import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Vertrag} from "../vertrag";
import {VertragService} from "../vertrag.service";
import {Cat} from "../cat";
import {CatService} from "../cat.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{

  id!: number;
  customer: Customer = new Customer();
  vertraege: Vertrag[] = [];
  cat: Cat = new Cat();
  cats: Cat[] = [];
  constructor(private route: ActivatedRoute, private catService: CatService, private customerService: CustomerService, private vertragService: VertragService, private router: Router) {
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
  private getCatList() {
    this.catService.getCatList(this.id).subscribe(data => {
      this.cats = data;
      console.log("Katzen:");
      console.log(this.cats);
    });
  }






  createContract(id: number){
    this.router.navigate(['vertrag', id]);
  }
}
