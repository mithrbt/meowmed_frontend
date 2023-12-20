import {Component, OnInit} from '@angular/core';
import {Customer} from '../model/customer';
import {CustomerService} from '../service/customer.service';
import {Router} from '@angular/router';
import {Address} from '../model/address';
import {BankDetails} from "../model/bank-details";
import {Profession} from "../enum/Profession";
import {Title} from "../enum/Title";


@Component({
  selector: 'app-customer-register',
  templateUrl: 'customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})

export class CustomerRegisterComponent implements OnInit {

  customer: Customer = new Customer();
  address!: Address;
  bankDetails!: BankDetails;
  titleKeys = Object.keys(Title);
  title!: Title | undefined;


  constructor(private customerService: CustomerService,
              private router: Router) {
  }

  ngOnInit() {
    this.customer.address = new Address();
    this.customer.bankDetails = new BankDetails();
  }

  //Für Dropdown Titel
  getTitleValue(key: string): string {
    return Title[key as keyof typeof Title];
  }


  saveCustomer() {
    this.customerService.createCustomer(this.customer).subscribe(
      (data) => {
        this.customer = data;
        this.goToCustomerDetails();
      },
      (error) => console.log(error)
    );
  }


  createCustomer() {

    if (this.calculateAge(this.customer.birthdate) < 18) {
      alert('Der Kunde muss mindestens 18 Jahre alt sein.');
      return;
    }

    if (this.customer.profession === Profession.UNEMPLOYED) {
      alert('Der Kunde darf nicht Arbeitslos sein');
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

  goBack() {
    this.router.navigate(['kunden']);
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
    const ibanRegex = /^DE.{20}$/;

    return (
      this.customer.bankDetails !== null &&
      this.customer.bankDetails !== undefined &&
      this.customer.bankDetails.iban !== null &&
      this.customer.bankDetails.iban !== undefined &&
      this.customer.bankDetails.iban.match(ibanRegex) !== null
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
