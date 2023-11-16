import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Vertrag} from "../vertrag";
import {VertragService} from "../vertrag.service";
import {Cat} from "../cat";
import {CatService} from "../cat.service";
import {firstValueFrom, Observable} from "rxjs";
import {Address} from "../address";

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
  cats!: Map<number, Cat>;
  vertrag: Vertrag = new Vertrag();
  contract: Vertrag = new Vertrag();
  address!: Address;

  constructor(private route: ActivatedRoute,
              private catService: CatService,
              private customerService: CustomerService,
              private vertragService: VertragService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    });
    console.log("ID: " + this.id);
    this.getVertragList();
    this.customer.address = this.address;
    console.log("Adresse: " + this.address);
  }

  private getVertragList(){
    this.vertragService.getVertragList(this.id).subscribe(data =>{
      this.vertraege = data;
      console.log("Verträge:");
      console.log(this.vertraege);
      this.cats = new Map<number, Cat>();
      for (const vertrag of this.vertraege) {
        this.vertragService.getCatByContractId(vertrag.id).subscribe(data => {
          this.cats.set(vertrag.id, data);
        });
      }
    });
  }

  getCatByContractId(id: number): Cat {
    const cat = this.cats.get(id);
    if(cat) {
      return cat;
    } else {
      return new Cat();
    }
  }


  goToCreateContract(id: number){
    this.router.navigate(['vertrag', id]);
  }

  updateVertrag(id: number) {
    this.router.navigate(['update-vertrag',id])
  }

  vertragDetails(id: number) {
    this.router.navigate(['vertragdetails', id]);
  }

  deleteVertrag(event: any, id: number) {
    if(confirm('Sind Sie sicher, dass Sie den Vertrag löschen möchten?')){
      event.target.innerText = "Löschen...";
      this.catService.deleteCatByContractID(id).subscribe((response:any)=>{
        this.vertragService.deleteVertrag(id).subscribe((response:any)=>{
          this.getVertragList();
          alert("Der Vertrag wurde gelöscht. Die zugehörige Katze konnte nicht gefunden werden.");
        });
      });
    }
  }

}
