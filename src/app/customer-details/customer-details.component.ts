import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {Vertrag} from "../vertrag";
import {VertragService} from "../vertrag.service";
import {Cat} from "../cat";
import {CatService} from "../cat.service";
import {Address} from "../address";
import {ImageService} from "../image.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Image} from "../image";

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
  vertragdelete: Vertrag = new Vertrag();
  contract: Vertrag = new Vertrag();
  address!: Address;
  filteredContracts: Vertrag[] = [];
  searchTerm: string = '';
  totalMonthlyContribution: number = 0;
  today = new Date();

  dbImage!: any;
  postResponse!: any;
  image!: any;
  imageUrl: any;
  uploadedImage!: File;
  successResponse!: any;


  constructor(private route: ActivatedRoute,
              private catService: CatService,
              private customerService: CustomerService,
              private vertragService: VertragService,
              private router: Router,
              private imageService: ImageService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data =>{
      this.customer = data;
    });
    console.log("ID: " + this.id);
    this.getVertragList();
    this.customer.address = this.address;

    //Bild anzeigen
    this.imageService.viewImage(this.id).subscribe(res =>{
      this.postResponse = res;
      this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
    });
  }

  private getVertragList(){
    this.vertragService.getVertragList(this.id).subscribe(data =>{
      this.vertraege = data;
      this.filteredContracts = this.vertraege;
      console.log("Verträge:");
      console.log(this.vertraege);
      this.cats = new Map<number, Cat>();
      for (const vertrag of this.vertraege) {
        console.log("Contribution: " + vertrag.quote);
        console.log("Vertragende: " + vertrag.end);
        console.log("Heute:" + this.today);
        if(new Date(vertrag.end) >= this.today){
          this.totalMonthlyContribution = this.totalMonthlyContribution + vertrag.quote;
        }
        this.vertragService.getCatByContractId(vertrag.id).subscribe(data => {
          this.cats.set(vertrag.id, data);
        });
        //this.imageUploadAction();
        console.log(vertrag.quote);
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
    this.router.navigate(['update-vertrag',id]);
  }

  vertragDetails(id: number) {
    this.router.navigate(['vertragdetails', id]);
  }

  deleteVertrag(event: any, id: number) {
    this.totalMonthlyContribution = 0;
    if(confirm('Sind Sie sicher, dass Sie den Vertrag löschen möchten?')){
      event.target.innerText = "Löschen...";
      this.catService.deleteCatByContractID(id).subscribe((response:any)=>{
        this.vertragService.deleteVertrag(id).subscribe((response:any)=>{
          this.getVertragList();
          alert("Der Vertrag und die Katze wurden gelöscht.");
        });
      });
    }
  }

  isVertragAbgelaufen(vertrag: any): boolean {
    const currentDate = new Date();
    const vertragEnd = new Date(vertrag.end);
    return vertragEnd < currentDate;
  }

  filterCats(): void {
    this.filteredContracts = this.vertraege.filter(vertrag =>
      this.getCatByContractId(vertrag.id).name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  //Foto hochladen
  public onImageUpload(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedImage = input.files[0];
    }
  }

  imageUploadAction(){
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

    console.log("KundenID: ", this.customer.id);
    this.imageService.uploadFile(this.customer.id, imageFormData).subscribe((response) =>{
      window.location.reload();
    });
  }

  //Foto löschen
  deleteImage(event: any, id: number) {
    if(confirm('Sind Sie sicher, dass Sie das Bild löschen möchten?')){
      event.target.innerText = "Löschen...";
      this.imageService.deleteImage(id).subscribe((response: any) =>{
        alert("Das Foto wurde gelöscht.");
        window.location.reload();
      });
    }
  }

}
