export interface ConsumablesType {
  name: string;
  description: string;
  img: string;
}

export interface PotionType extends ConsumablesType {
  addHp: number;
  addMana: number;
}
