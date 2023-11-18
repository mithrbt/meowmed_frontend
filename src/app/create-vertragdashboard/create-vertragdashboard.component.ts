import {Component, OnInit} from '@angular/core';
import {VertragService} from "../vertrag.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Vertrag} from "../vertrag";
import {CustomerService} from "../customer.service";
import {Customer} from "../customer";
import {Cat} from "../cat";
import {CatService} from "../cat.service";
import {Environment} from "../enums/Environment";
import {BreedService} from "../breed.service";
import {Breed} from "../breed";


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
  breeds: Breed[] = [];
  selectedBreed!: Breed;

  constructor(private catService: CatService,
              private vertragService: VertragService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private breedService: BreedService){
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    });
    this.environmentKeys = Object.keys(Environment).filter(Number);
    this.getBreedList();
  }

  getBreedList(){
    this.breedService.getAllBreeds().subscribe(data =>{
      this.breeds = data;
      console.log(data);
    })
  }

  onSelectBreed(){
    console.log("Ausgewählte Rasse: ", this.selectedBreed.name);
    this.breedService.getBreedById(this.selectedBreed.name).subscribe(data =>{
      this.cat.breed = data;
      console.log("Rasse:", this.cat.breed);
    });
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
    console.log("Katzenrasse:" , this.cat.breed);
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
