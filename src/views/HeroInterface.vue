<script setup lang="ts">
import { ref } from "vue";
import Warrior from "@/assets/img/Warrior.png";
import Mage from "@/assets/img/Mage.png";
import Hunter from "@/assets/img/Hunter.png";
import Rogue from "@/assets/img/Rogue.png";
import healthPotionImg from "@/assets/img/potion/healthPotion.png";
import { useRouter } from "vue-router";
import { useCharacterStore } from "@/stores/character";
import { Hero } from "@/util/character";
import { Potion } from "@/util/consumables";

const store = useCharacterStore();
const router = useRouter();
interface HeroList {
  name: string;
  description: string;
  img: string;
  config: [
    string,
    string,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  potions?: Array<{
    config: [string, string, string, number, number];
    number: number;
  }>;
}

const heroList = ref<Array<HeroList>>([
  {
    name: "戰士 Warrior",
    description:
      "戰士們重裝上陣，與敵人正面交鋒，無視於敵人在他們鎧甲上擦身而過的攻擊。\n他們運用變化多端的戰術與多款各式武器來保護較脆弱的隊友。\n怒氣是戰士們強力攻擊的原動力，因此他們必須小心運用怒氣，在戰鬥中發揮最大效益。",
    img: Warrior,
    config: ["戰士 Warrior", Warrior, 250, 10, 100, 80, 50, 0, 1],
    potions: [
      {
        config: ["生命藥水", "補充50點生命值", healthPotionImg, 50, 0],
        number: 4,
      },
      {
        config: ["mana藥水", "補充50點生命值", healthPotionImg, 0, 40],
        number: 3,
      },
    ],
  },
  {
    name: "法師 Mage",
    description:
      "秘法咒語讓法師面對敵人時無往不利。即使法師能施展強大破壞力的法術，但本身卻極為脆弱且護甲單薄，在近身攻擊中特別容易吃虧。有智慧的法師會謹慎的運用法術，將敵人控制在一定的距離之外或困住他們",
    img: Mage,
    config: ["法師 Mage", Mage, 250, 10, 100, 80, 50, 0, 1],
  },
  {
    name: "獵人 Hunter",
    description:
      "會與對手遠距交戰，在射箭或開槍的同時，他們的寵物就會聽令發動攻擊。即使這種遠程攻擊武器殺傷力十足，一旦敵人近距離接觸，就會對獵人不利，所以他們通常會設法避開或困住敵人，才能在安全距離下持續發動攻擊。",
    img: Hunter,
    config: ["獵人 Hunter", Hunter, 250, 10, 100, 80, 50, 0, 1],
  },
  {
    name: "盜賊 Rogue",
    description:
      "盜賊經常自暗處意外出沒，惡毒地近身突襲對手。在持久戰之中，他們所採取的是小心翼翼地連續攻擊，不斷削弱對手直到一擊斃命。盜賊在選擇對手時需特別謹慎，以免浪費連擊的效果；而他們也必須保持警覺，在戰況不利時隱匿或逃脫",
    img: Rogue,
    config: ["盜賊 Rogue", Rogue, 250, 10, 100, 80, 50, 0, 1],
  },
]);

const chooseHero = (
  config: [
    string,
    string,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ],
  potions: any
) => {
  const hero = new Hero(...config);
  const potionsList: any = [];
  if (potions?.length) {
    potions.forEach(
      (e: {
        config: [string, string, string, number, number];
        number: number;
      }) => {
        const arr = new Array(e.number);
        arr.fill(new Potion(...e.config));
        potionsList.push(...arr);
      }
    );
  }
  store.currentHero = hero;
  store.currentPotions = potionsList;
  router.push("/arena");
};
</script>

<template>
  <div class="header">
    <p>這是一個小RPG遊戲 made by Amos</p>
    <h2>選擇你的英雄</h2>
  </div>
  <div class="interface">
    <div
      class="interface-in flex py-20px cursor-pointer"
      v-for="hero in heroList"
      :key="hero.name"
      @click="chooseHero(hero.config, hero.potions)"
    >
      <img :src="hero.img" alt="Warrior" />
      <div class="p-20px interface-text">
        <h3 class="mb-20px">{{ hero.name }}</h3>
        <p>
          {{ hero.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin: 20px;
}
.header p {
  font-size: 25px;
}
.header h2 {
  font-size: 30px;
  color: #f8b700;
  margin: 0;
}

/* interface*/

.interface {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
  background-color: black;
  img {
    width: 200px;
    object-fit: cover;
    display: block;
  }
}

.interface-text {
  margin: 15px auto;
  h3 {
    color: #f8b700;
    font-size: 24px;
  }
  p {
    line-height: 30px;
  }
}
.interface-in {
  max-width: 960px;
  &:hover {
    background-color: #211510;
  }
  &:active {
    background-color: #211510;
  }
}
</style>
