import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { Address } from '../address';
import {BankDetails} from "../bank-details";


@Component({
  selector: 'app-customer-register',
  templateUrl: 'customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  customer: Customer = new Customer();
  address!: Address;
  bankDetails!: BankDetails;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit() {
    this.customer.address = new Address();
    this.customer.bankDetails = new BankDetails();
  }

  saveCustomer() {
    this.customerService.createCustomer(this.customer).subscribe(
      (data) => {
        console.log(data);
        this.customer = data;
        this.goToCustomerDetails();
      },
      (error) => console.log(error)
    );
  }

  createCustomer() {
    console.log(this.customer);

    if (!this.validateForm() || !this.validateSozialversicherungsnummer()) {
      // Zeige das Dialogfenster an
      this.openValidationDialog();
      return; // Stoppe die Funktion, um das Formular nicht abzusenden
    } else {
      this.saveCustomer();
    }
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
}
