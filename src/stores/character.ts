import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { HeroType, MonsterType } from "@/interface/character";
import type { PotionType } from "@/interface/consumables";

export const useCharacterStore = defineStore("character", () => {
  const currentHero = ref<HeroType | null>(null);
  const currentEnemy = ref<MonsterType | null>(null);
  const currentPotions = ref<Array<PotionType>>([]);

  const resetHero = () => {
    currentHero.value = null;
  };
  const resetEnemy = () => {
    currentEnemy.value = null;
  };
  return { currentHero, currentPotions, currentEnemy, resetHero, resetEnemy };
});
