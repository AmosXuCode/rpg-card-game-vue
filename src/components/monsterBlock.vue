<script setup lang="ts">
import type { MonsterType } from "@/interface/character";
defineProps<{
  monster: MonsterType | null;
}>();
const healthPercent = (currentHealth: number = 0, healthLimit: number = 0) => {
  return Math.floor((currentHealth / healthLimit) * 100);
};
</script>

<template>
  <div class="monster-block">
    <div class="monster-container flex justify-center">
      <img :src="monster?.img" class="img-avatar" />
      <div class="monster-content w-100">
        <h3>
          {{ monster?.name }}
        </h3>
        <div>
          <p class="health-player">生命:{{ monster?.totalHealth }}</p>
          <el-progress
            :percentage="
              healthPercent(monster?.totalHealth, monster?.healthLimit)
            "
            color="red"
          />
        </div>
        <p>魔力: {{ monster?.mana }}</p>
        <p>力量: {{ monster?.strength }}</p>
        <p>敏捷: {{ monster?.agility }}</p>
        <p>速度: {{ monster?.speed }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* pre-fight*/
.monster-block {
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

.monster-container {
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
