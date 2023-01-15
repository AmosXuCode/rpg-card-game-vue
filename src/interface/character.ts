export interface CharacterType {
  name: string;
  health: number;
  mana: number;
  strength: number;
  agility: number;
  speed: number;
  healthLimit: number;
}

export interface HeroType extends CharacterType {
  exp: number;
  level: number;
}

export interface MonsterType extends CharacterType {}
