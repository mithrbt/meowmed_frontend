import {Profession} from "./enums/Profession";
import {Address} from "./address";
import {FamilyStatusEnum} from "./enums/FamilyStatus.enum";
import {BankDetails} from "./bank-details";

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
    email!: String;
}
