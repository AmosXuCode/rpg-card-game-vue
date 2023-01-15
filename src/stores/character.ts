import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { HeroType, MonsterType } from "@/interface/character";

export const useCharacterStore = defineStore("character", () => {
  const currentHero = ref<{
    hero: HeroType;
    heroImg: string;
  } | null>(null);
  const currentEnemy = ref<{
    monster: MonsterType;
    monsterImg: string;
  } | null>(null);

  const resetHero = () => {
    currentHero.value = null;
  };
  const resetEnemy = () => {
    currentEnemy.value = null;
  };
  return { currentHero, currentEnemy, resetHero, resetEnemy };
});
