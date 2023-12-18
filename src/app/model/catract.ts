import {Cat} from "./cat";
import {Vertrag} from "./vertrag";
import {Customer} from "./customer";

export class Catract {

  cat: Cat;
  contract: Vertrag;

  constructor(contract: Vertrag, cat: Cat) {
    this.cat = cat;
    this.contract = contract;
  }

}
