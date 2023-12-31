import {Component, OnInit} from '@angular/core';
import {VertragService} from "../service/vertrag.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Vertrag} from "../model/vertrag";
import {CustomerService} from "../service/customer.service";
import {Customer} from "../model/customer";
import {Cat} from "../model/cat";
import {CatService} from "../service/cat.service";
import {Environment} from "../enum/Environment";
import {BreedService} from "../service/breed.service";
import {Breed} from "../model/breed";
import {Personality} from "../enum/Personality";

@Component({
  selector: 'app-create-vertragdashboard',
  templateUrl: './create-vertragdashboard.component.html',
  styleUrls: ['./create-vertragdashboard.component.css']
})

export class CreateVertragdashboardComponent implements OnInit {

  vertrag: Vertrag = new Vertrag();
  id!: number;
  customer: Customer = new Customer();
  cat: Cat = new Cat();
  contract!: Vertrag;
  result!: number;
  environmentKeys!: any;
  breeds: Breed[] = [];
  selectedBreed!: Breed;
  actionType: string | null = null;
  cats!: Cat[];
  catNameExists!: boolean;


  constructor(private catService: CatService,
              private vertragService: VertragService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private breedService: BreedService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.actionType = params['action'];
      this.id = this.route.snapshot.params['id'];
      this.customerService.getCustomerById(this.id).subscribe(data => {
        this.customer = data;
      });
      this.environmentKeys = Object.keys(Environment).filter(Number);
      this.getBreedList();
    });
  }


  getBreedList() {
    this.breedService.getAllBreeds().subscribe(data => {
      this.breeds = data;
    });
  }

  onSelectBreed() {
    console.log("Ausgewählte Rasse: ", this.selectedBreed.name);
    this.breedService.getBreedById(this.selectedBreed.name).subscribe(data => {
      this.cat.breed = data;
    });
  }


  saveVertrag() {
    this.vertragService.createVertrag(this.id, this.vertrag).subscribe(data => {
        this.contract = data;
        this.saveCat();
        this.goToCustomerDetails();
      },
      error => console.log(error)
    );
  }

  createVertrag() {
    this.catNameExists = false;
    this.catService.getCatList(this.customer.id).subscribe(data => {
      this.cats = data;
      for (let i = 0; i < this.cats.length; i++) {
        if (this.cats[i].name === this.cat.name) {
          this.catNameExists = true;
          alert('Der Kunde besitzt schon eine Katze mit dem Namen: ' + this.cat.name);
          return;
        }
      }

      if (this.catNameExists) {
        return;
      }

      if (this.cat.personality.toString().toLowerCase() === Personality.VERSPIELT) {
        alert('Die Katze darf nicht verspielt sein.');
        return;
      }

      if (!this.validateStart()) {
        alert('Das Start-Datum darf nicht in der Vergangenheit liegen und das End-Datum darf nicht vor dem Start-Datum liegen.');
        return;
      }

      if (!this.validateForm()) {
        // Zeige das Dialogfenster an
        this.openValidationDialog();
        return; // Stoppe die Funktion, um das Formular nicht abzusenden
      }
      this.saveVertrag();
    });
  }

  saveCat() {
    console.log("VertragID: " + this.contract.id);
    this.catService.createCat(this.id, this.contract.id, this.cat).subscribe(data => {
        console.log(data);
      },
      error => console.log(error)
    );
  }


  goToCustomerDetails() {
    this.router.navigate(['kundendetails', this.customer.id]);
  }

  goBack() {
    this.router.navigate(['kundendetails', this.customer.id]);
  }

  quote() {
    console.log("Katzenrasse:", this.cat.breed);
    this.vertragService.quote(this.cat, this.vertrag, this.customer).subscribe(data => {
        this.result = data;
        this.vertrag.quote = this.result;
      },
      error => {
        console.log(error);
      });
  }


  validateForm(): boolean {
    return (
      this.cat.environment !== null && this.cat.environment !== undefined &&
      this.cat.color !== null && this.cat.color !== undefined &&
      this.cat.personality !== null && this.cat.personality !== undefined &&
      this.cat.name !== null && this.cat.name !== undefined &&
      this.cat.birthdate !== null && this.cat.birthdate !== undefined &&
      this.cat.weight !== null && this.cat.weight !== undefined &&
      this.cat.breed !== null && this.cat.breed !== undefined
    );
  }

  openValidationDialog(): void {
    alert('Nicht alle Felder sind ausgefüllt. Bitte überprüfen Sie Ihre Eingaben.');
  }

  validateStart(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(this.vertrag.start);
    const end = new Date(this.vertrag.end);
    return (
      start.getTime() >= today.getTime() && end > start
    )
  }

}
