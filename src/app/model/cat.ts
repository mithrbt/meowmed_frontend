import {Color} from "../enum/Color";
import {Environment} from "../enum/Environment";
import {Personality} from "../enum/Personality";
import {Breed} from "./breed";
import {Image} from "./image";

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
  image!: Image;
}
