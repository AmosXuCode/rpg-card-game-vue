<script setup lang="ts">
import type { HeroType } from "@/interface/character";
defineProps<{
  heroSet: {
    hero: HeroType | null;
    heroImg: string;
  } | null;
}>();
const healthPercent = (currentHealth: number = 0, healthLimit: number = 0) => {
  return (currentHealth / healthLimit) * 100;
};
</script>

<template>
  <div class="hero-block">
    <div class="hero-container flex justify-center">
      <img :src="heroSet?.heroImg" class="img-avatar" />
      <div class="hero-content w-100">
        <h3>
          {{ heroSet?.hero?.name
          }}<span> 等級: LV{{ heroSet?.hero?.level }}</span>
        </h3>
        <div>
          <p class="health-player">生命:{{ heroSet?.hero?.health }}</p>
          <el-progress
            :percentage="
              healthPercent(heroSet?.hero?.health, heroSet?.hero?.healthLimit)
            "
            color="red"
          />
        </div>
        <p>魔力: {{ heroSet?.hero?.mana }}</p>
        <p>力量: {{ heroSet?.hero?.strength }}</p>
        <p>敏捷: {{ heroSet?.hero?.agility }}</p>
        <p>速度: {{ heroSet?.hero?.speed }}</p>
        <div>
          <span>經驗值:</span>
          <el-progress :percentage="heroSet?.hero?.exp ?? 0 / 100" />
        </div>
      </div>
      <div
        class="hero-items flex w-[140px] flex-wrap justify-around items-center ml-20px"
      >
        <div class="bg-light-50 w-[50px] h-[50px] cursor-pointer"></div>
        <div class="bg-light-50 w-[50px] h-[50px] cursor-pointer"></div>
        <div class="bg-light-50 w-[50px] h-[50px] cursor-pointer"></div>
        <div class="bg-light-50 w-[50px] h-[50px] cursor-pointer"></div>
        <div class="bg-light-50 w-[50px] h-[50px] cursor-pointer"></div>
        <div class="bg-light-50 w-[50px] h-[50px] cursor-pointer"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* pre-fight*/
.hero-block {
  h3 {
    color: #f8b700;
    font-size: 30px;
  }
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-right: 20px;
  }
}

.hero-container {
  max-width: 800px;
  margin: 0 auto;
}

/*enemy*/
.enemy {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  text-align: center;
  background-color: black;
  margin-top: 20px;
}
</style>
