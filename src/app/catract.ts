import {Cat} from "./cat";
import {Vertrag} from "./vertrag";

export class Catract {

  cat: Cat;
  contract: Vertrag;

  constructor(contract: Vertrag, cat: Cat) {
    this.cat = cat;
    this.contract = contract;
  }

}
