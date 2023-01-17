import type { ConsumablesType, PotionType } from "@/interface/consumables";

export class Consumables implements ConsumablesType {
  name: string;
  description: string;
  img: string;
  constructor(name: string, description: string, img: string) {
    this.name = name;
    this.description = description;
    this.img = img;
  }
  static destory(obj: any) {
    obj = undefined;
  }
}

export class Potion extends Consumables implements PotionType {
  addHp: number;
  addMana: number;
  constructor(
    name: string,
    description: string,
    img: string,
    addHp: number,
    addMana: number
  ) {
    super(name, description, img);
    this.addHp = addHp;
    this.addMana = addMana;
  }
}
