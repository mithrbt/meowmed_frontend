import {Component, OnInit} from '@angular/core';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import {Address} from '../address';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {BankDetails} from "../bank-details";
import {Profession} from "../enums/Profession";

@Component({
  selector: 'app-customer-register',
  templateUrl: 'customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  customer: Customer = new Customer();
  address!: Address;

  uploader: FileUploader = new FileUploader({
    url: 'URL_ZUM_UPLOAD_ENDPUNKT', // Setzen Sie die tatsächliche URL zum Server-Upload-Endpunkt
    itemAlias: 'file',
  });
  bankDetails!: BankDetails;


  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit() {
    this.customer.address = new Address();
    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.log('Datei hochgeladen:', item.file.name, 'Status:', status, 'Server-Antwort:', response);
    };

    this.customer.bankDetails = new BankDetails();
  }

  saveCustomer() {
      this.customerService.createCustomer(this.customer).subscribe(
        (data) => {
          console.log(data);
          this.customer = data;
          this.uploader.uploadAll();
          this.goToCustomerDetails();
        },
        (error) => console.log(error)
      );
  }

  createCustomer() {
    console.log(this.customer);
    if(this.calculateAge(this.customer.birthdate) < 18){
      alert('Der Kunde muss mindestens 18 Jahre alt sein.');
      return;
    }

    if (!this.validateForm() || !this.validateSozialversicherungsnummer()) {
      // Zeige das Dialogfenster an
      this.openValidationDialog();
      return; // Stoppe die Funktion, um das Formular nicht abzusenden
    }

    this.saveCustomer();

  }

  goToCustomerDetails() {
    this.router.navigate(['kundendetails', this.customer.id]);
  }

  validateForm(): boolean {
    return (
      this.customer.firstname !== null &&
      this.customer.firstname !== undefined &&
      this.customer.lastname !== null &&
      this.customer.lastname !== undefined &&
      this.customer.address.street !== null &&
      this.customer.address.street !== undefined &&
      this.customer.address.houseNr !== null &&
      this.customer.address.houseNr !== undefined &&
      this.customer.address.zipCode !== null &&
      this.customer.address.zipCode !== undefined &&
      this.customer.address.city !== null &&
      this.customer.address.city !== undefined &&
      this.customer.address.country !== null &&
      this.customer.address.country !== undefined &&
      this.customer.birthdate !== null &&
      this.customer.birthdate !== undefined &&
      this.customer.taxID !== null &&
      this.customer.taxID !== undefined &&
      this.customer.svn !== null &&
      this.customer.svn !== undefined &&
      this.customer.telNr !== null &&
      this.customer.telNr !== undefined &&
      this.customer.income !== null &&
      this.customer.income !== undefined &&
      this.customer.familyStatus !== null &&
      this.customer.familyStatus !== undefined &&
      this.customer.profession !== null &&
      this.customer.profession !== undefined &&
      this.customer.bankDetails !== null &&
      this.customer.bankDetails != undefined
    );
  }
  validateSozialversicherungsnummer(): boolean {
    const sozialversicherungsnummerRegex = /^\d{2}\d{2}\d{2}\d{2}[A-Z]\d{3}$/;
    return this.customer.svn !== null && this.customer.svn !== undefined && this.customer.svn.toString().match(sozialversicherungsnummerRegex) !== null;
  }


  validateIBAN(): boolean {
    // Muster für IBAN Deutschland
    const ibanRegex = /^DE.{20}$/;

    return (
      this.customer.bankDetails !== null && // Überprüfe, ob die Bankdetails nicht null sind
      this.customer.bankDetails !== undefined && // Überprüfe, ob die Bankdetails nicht undefined sind
      this.customer.bankDetails.iban !== null && // Überprüfe, ob die IBAN nicht null ist
      this.customer.bankDetails.iban !== undefined && // Überprüfe, ob die IBAN nicht undefined ist
      this.customer.bankDetails.iban.match(ibanRegex) !== null // Überprüfe, ob die IBAN dem Muster entspricht
    );
  }


  openValidationDialog(): void {
    alert('Nicht alle Felder sind ausgefüllt. Bitte überprüfen Sie Ihre Eingaben.');
  }

  validateSteuerID() {
    const steuerIDRegex = /^\d{11}$/;
    return this.customer.taxID !== null && this.customer.taxID !== undefined && this.customer.taxID.toString().match(steuerIDRegex) !== null;
  }

  calculateAge(birthdate: Date): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    // Wenn der aktuelle Monat vor dem Geburtsmonat liegt oder im gleichen Monat liegt, aber vor dem Geburtstag
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
