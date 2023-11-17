import {Component, OnInit} from '@angular/core';
import {VertragService} from "../vertrag.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Vertrag} from "../vertrag";
import {CustomerService} from "../customer.service";
import {Customer} from "../customer";
import {Cat} from "../cat";
import {CatService} from "../cat.service";
import {Environment} from "../enums/Environment";


@Component({
  selector: 'app-create-vertragdashboard',
  templateUrl: './create-vertragdashboard.component.html',
  styleUrls: ['./create-vertragdashboard.component.css']
})
export class CreateVertragdashboardComponent implements OnInit{

  vertrag : Vertrag = new Vertrag();
  id!: number;
  customer: Customer = new Customer();
  cat: Cat = new Cat();
  contract!: Vertrag;
  result!: number;
  environmentKeys!: any;
  selectedItem: any;
  breeds: string[] = ['Perserkatze', 'Rasse 2', 'Rasse 3'];
  selectedBreed: string = '';

  constructor(private catService: CatService,
              private vertragService: VertragService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService){
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    });
    this.environmentKeys = Object.keys(Environment).filter(Number);
  }

  onSelectBreed(){
    this.cat.breed = this.selectedBreed;
    console.log("Ausgewählte Rasse:", this.selectedBreed);
  }


  saveVertrag(){
    this.vertragService.createVertrag(this.id, this.vertrag).subscribe(data =>{
        console.log(data);
        this.contract = data;
        this.saveCat();
        this.goToCustomerDetails();
      },
      error => console.log(error)
    );
  }

  createVertrag() {
    console.log(this.vertrag);
    this.saveVertrag();
  }

  saveCat(){
    console.log("VertragID: " + this.contract.id);
    this.catService.createCat(this.contract.id, this.cat).subscribe(data =>{
      console.log(data);
      },
      error => console.log(error)
    );
  }


  goToCustomerDetails(){
    this.router.navigate(['kundendetails', this.customer.id]);
  }

  quote() {
    this.vertragService.quote(this.cat, this.vertrag, this.customer).subscribe(data =>{
      this.result = data;
      console.log(this.result);
    },
      error => {
        console.log(error);
    });
  }

  showMonthlyContribution(){
    this.quote();
    console.log(this.result);
  }

}
