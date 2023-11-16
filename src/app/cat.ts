import {Color} from "./enums/Color";
import {Environment} from "./enums/Environment";
import {Personality} from "./enums/Personality";
import {Breed} from "./breed";

export class Cat {
  id!: number;
  name!: string;
  environment!: Environment;
  color!: Color;
  personality!: Personality;
  birthdate!: Date;
  weight!: number;
  castrated!: boolean;
  breed!: Breed;
}
