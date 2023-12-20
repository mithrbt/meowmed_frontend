import {Profession} from "../enum/Profession";
import {Address} from "./address";
import {FamilyStatusEnum} from "../enum/FamilyStatus.enum";
import {BankDetails} from "./bank-details";
import {Image} from "./image";
import {Title} from "../enum/Title";

export class Customer {
    id!: number;
    firstname!: string;
    lastname!: string;
    address!: Address;
    birthdate!: Date;
    taxID!: number;
    svn!: number;
    telNr!: number;
    income!: number;
    profession!: Profession;
    familyStatus!: FamilyStatusEnum;
    bankDetails!: BankDetails;
    email!: string;
    image!: Image;
    title!: Title;
}
