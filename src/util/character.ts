import type {
  CharacterType,
  HeroType,
  MonsterType,
} from "@/interface/character";
export class Character implements CharacterType {
  name: string;
  health: number;
  mana: number;
  strength: number;
  agility: number;
  speed: number;
  healthLimit: number;
  constructor(
    name: string,
    health: number,
    mana: number,
    strength: number,
    agility: number,
    speed: number
  ) {
    this.name = name;
    this.health = health + strength * 0.3;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
    this.healthLimit = this.health;
  }

  attack() {
    const totalAttack = this.strength + this.mana * 0.4;
    return totalAttack;
  }

  dodge() {
    let dodgeChance = this.agility * 0.1;
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
    health: number,
    mana: number,
    strength: number,
    agility: number,
    speed: number,
    exp: number,
    level: number = 1
  ) {
    super(name, health, mana, strength, agility, speed);
    this.exp = exp;
    this.level = level;
  }

  battle(monster: any) {
    console.log(`${this.name}'s attack: ${this.attack()}`);
    console.log(`${monster.name}'s attack: ${monster.attack()}`);
    console.log(`${this.name}'s dodge chance: ${this.dodge()}`);
    console.log(`${monster.name}'s dodge chance: ${monster.dodge()}`);

    const heroAttack = this.attack();
    const monsterAttack = monster.attack();

    if (Math.random() > monster.dodge()) {
      monster.health -= heroAttack;
    }
    if (Math.random() > this.dodge()) {
      this.health -= monsterAttack;
    }

    if (monster.health <= 0) {
      console.log(`${this.name} has defeated ${monster.name}!`);
      this.exp += 50;
      this.levelUp();
    }
    if (this.health <= 0) {
      console.log(`${monster.name} has defeated ${this.name}!`);
    }
  }

  levelUp() {
    if (this.exp >= 100) {
      this.level++;
      this.exp = 0;
      this.health += this.strength * 0.3;
      this.strength += 2;
      this.mana += 1;
      this.agility += 1;
      this.speed += 1;
      alert(`恭喜升等 已升到${this.level} 等`);
    }
  }
}

export class Monster extends Character implements MonsterType {
  constructor(
    name: string,
    health: number,
    mana: number,
    strength: number,
    agility: number,
    speed: number
  ) {
    super(name, health, mana, strength, agility, speed);
  }
}
