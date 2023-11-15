import {Color} from "./enums/Color";
import {Environment} from "./enums/Environment";
import {Personality} from "./enums/Personality";

export class Cat {
  id!: number;
  name!: string;
  environment!: Environment;
  color!: Color;
  personality!: Personality;
  birthdate!: Date;
  weight!: number;
  castrated!: boolean;
  
}
