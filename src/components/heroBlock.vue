<script setup lang="ts">
import type { HeroType } from "@/interface/character";
import type { PotionType } from "@/interface/consumables";
import healthPotion from "@/assets/img/potion/healthPotion.png";

defineProps<{
  hero: HeroType | null;
  potions: Array<PotionType>;
}>();
const healthPercent = (currentHealth: number = 0, healthLimit: number = 0) => {
  return Math.floor((currentHealth / healthLimit) * 100);
};
</script>

<template>
  <div class="hero-block">
    <div class="hero-container flex justify-center">
      <img
        :src="hero?.img"
        class="img-avatar filter"
        :class="{ grayscale: !hero?.totalHealth }"
      />
      <div class="hero-content w-100">
        <h3>
          {{ hero?.name }}<span> 等級: {{ hero?.level }}</span>
        </h3>
        <div>
          <p class="health-player">生命:{{ hero?.totalHealth }}</p>
          <el-progress
            :percentage="healthPercent(hero?.totalHealth, hero?.healthLimit)"
            color="red"
          />
        </div>
        <p>魔力: {{ hero?.mana }}</p>
        <p>力量: {{ hero?.strength }}</p>
        <p>敏捷: {{ hero?.agility }}</p>
        <p>速度: {{ hero?.speed }}</p>
        <div>
          <span>經驗值:</span>
          <el-progress :percentage="hero?.exp ?? 0 / 100" />
        </div>
      </div>
      <div
        v-if="potions.length"
        class="hero-items flex w-[140px] flex-wrap justify-around items-center ml-20px"
      >
        <div
          class="bg-light-50 w-[50px] h-[50px] cursor-pointer"
          v-for="(potion, i) in potions"
          :key="i"
        >
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="potion.description"
            placement="top-start"
          >
            <template #content>
              <h3>{{ potion.name }}</h3>
              <p>{{ potion.description }}</p>
            </template>
            <img :src="potion.img" :alt="potion.description" />
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* pre-fight*/
.hero-block {
  h3 {
    color: #f8b700;
    font-size: 30px;
  }
  .img-avatar {
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
