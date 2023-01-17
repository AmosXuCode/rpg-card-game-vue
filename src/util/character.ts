import type {
  CharacterType,
  HeroType,
  MonsterType,
} from "@/interface/character";
import Swal from "sweetalert2";
import { Consumables } from "./consumables";

export class Character implements CharacterType {
  name: string;
  img: string;
  health: number;
  mana: number;
  strength: number;
  agility: number;
  speed: number;
  healthLimit: number;
  constructor(
    name: string,
    img: string,
    health: number,
    mana: number,
    strength: number,
    agility: number,
    speed: number
  ) {
    this.name = name;
    this.img = img;
    this.health = health + strength * 0.3;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
    this.healthLimit = this.totalHealth;
  }

  get totalHealth() {
    return Math.floor(this.health + this.strength * 0.3);
  }

  set totalHealth(value: number) {
    this.health = value;
  }

  attack() {
    const totalAttack = this.strength + this.mana * 0.4;
    return totalAttack;
  }

  dodge() {
    let dodgeChance = this.agility * 0.01;
    if (dodgeChance > 0.9) {
      dodgeChance = 0.9;
    }
    return dodgeChance;
  }
}

export class Hero extends Character implements HeroType {
  exp: number;
  level: number;
  constructor(
    name: string,
    img: string,
    health: number,
    mana: number,
    strength: number,
    agility: number,
    speed: number,
    exp: number,
    level: number = 1
  ) {
    super(name, img, health, mana, strength, agility, speed);
    this.exp = exp;
    this.level = level;
  }

  useItem(obj: any) {
    const type = obj.constructor.name;
    if (type === "Potion") {
      this.health += obj.addHp;
      this.mana += obj.addMana;
      Consumables.destory(obj);
    }
  }

  levelUp() {
    if (this.exp >= 100) {
      this.level++;
      this.exp = 0;
      this.health += 50;
      this.healthLimit += 50;
      this.strength += 2;
      this.mana += 1;
      this.agility += 1;
      this.speed += 1;
      Swal.fire({
        title: `恭喜升等 已升到${this.level} 等`,
        confirmButtonText: "確認",
      });
    }
  }
}

export class Monster extends Character implements MonsterType {
  constructor(
    name: string,
    img: string,
    health: number,
    mana: number,
    strength: number,
    agility: number,
    speed: number
  ) {
    super(name, img, health, mana, strength, agility, speed);
  }
}
