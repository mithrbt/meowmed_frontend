import {Cat} from "./cat";
import {Vertrag} from "./vertrag";
import {Customer} from "./customer";

export class Catract {

  cat: Cat;
  contract: Vertrag;
  customer: Customer;

  constructor(contract: Vertrag, cat: Cat, customer: Customer) {
    this.cat = cat;
    this.contract = contract;
    this.customer = customer;
  }

}
