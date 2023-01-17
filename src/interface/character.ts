export interface CharacterType {
  name: string;
  img: string;
  health: number;
  mana: number;
  strength: number;
  agility: number;
  speed: number;
  healthLimit: number;
  totalHealth: number;
  attack: () => number;
  dodge: () => number;
}

export interface HeroType extends CharacterType {
  exp: number;
  level: number;
  useItem: (obj: any) => void;
  levelUp: () => void;
}

export interface MonsterType extends CharacterType {}
