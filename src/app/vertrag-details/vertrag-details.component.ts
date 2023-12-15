import {Component, OnInit} from '@angular/core';
import {Cat} from "../cat";
import {Vertrag} from "../vertrag";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../customer.service";
import {VertragService} from "../vertrag.service";
import {ImageService} from "../image.service";

@Component({
  selector: 'app-vertrag-details',
  templateUrl: './vertrag-details.component.html',
  styleUrls: ['./vertrag-details.component.css']
})
export class VertragDetailsComponent implements OnInit{
  id!: number;
  vertrag: Vertrag = new Vertrag();
  cat: Cat = new Cat();

  dbImage!: any;
  postResponse!: any;
  image!: any;
  imageUrl: any;
  uploadedImage!: File;
  successResponse!: any;

  constructor(private route: ActivatedRoute,
              private vertragService: VertragService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.vertragService.getVertragById(this.id).subscribe(data =>{
      this.vertrag = data;
    });
    console.log("ID: " + this.id);
    this.getCatList();
  }

  private getCatList() {
    this.vertragService.getCatByContractId(this.id).subscribe(data => {
      console.log("ID: " + data);
      this.cat = data;
      console.log(data.name);
      //Bild anzeigen
      console.log("Cat ID: " + this.cat.id);
      this.imageService.viewCatImage(this.cat.id).subscribe(res =>{
        this.postResponse = res;
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
      });
    });

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

    console.log("KundenID: ", this.cat.id);
    this.imageService.uploadCatImage(this.cat.id, imageFormData).subscribe((response) =>{
      window.location.reload();
    });
  }

  //Foto löschen
  deleteImage(event: any, id: number) {
    if(confirm('Sind Sie sicher, dass Sie das Bild löschen möchten?')){
      event.target.innerText = "Löschen...";
      this.imageService.deleteCatImage(id).subscribe((response: any) =>{
        alert("Das Foto wurde gelöscht.");
        window.location.reload();
      });
    }
  }

}
