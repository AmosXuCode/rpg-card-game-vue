<script setup lang="ts">
import { ref, computed } from "vue";
import HeroBlock from "@/components/heroBlock.vue";
import MonsterBlock from "@/components/monsterBlock.vue";
import { useRouter } from "vue-router";
import { useCharacterStore } from "@/stores/character";
import Swal from "sweetalert2";
import { Monster } from "@/util/character";
import { mosterList } from "@/util/mosterList";
import { ElNotification } from "element-plus";
const store = useCharacterStore();
const router = useRouter();
const attacking = ref(false);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const resetGame = () => {
  store.resetEnemy();
  store.resetHero();
  router.push("/");
};

const findEnemy = () => {
  let chooseRandomEnemy = Math.floor(
    Math.random() * Math.floor(mosterList.length)
  );
  const monster = new Monster(...mosterList[chooseRandomEnemy]);
  store.currentEnemy = monster;
  Swal.fire({
    title: "發現敵人！",
    text: `你遇到了 ${monster.name} 戰勝它！`,
    confirmButtonText: "Cool",
  });
};
const checkIsNext = () => {
  if (store.currentEnemy === null) {
    return true;
  } else {
    return store.currentEnemy?.health >= 0 ? false : true;
  }
};

const battle = async () => {
  const monster = store.currentEnemy;
  const hero = store.currentHero;
  if (!monster || !hero) return;
  attacking.value = true;
  console.log(`${hero.name}'s attack: ${hero.attack()}`);
  console.log(`${monster.name}'s attack: ${monster.attack()}`);
  console.log(`${hero.name}'s dodge chance: ${hero.dodge()}`);
  console.log(`${monster.name}'s dodge chance: ${monster.dodge()}`);
  const heroAttack = hero.attack();
  const monsterAttack = monster.attack();

  if (Math.random() > monster.dodge()) {
    ElNotification({
      message: `
            你對怪物造成了${heroAttack}傷害
            `,
      type: "success",
      position: "bottom-right",
    });
    monster.health -= heroAttack;
  } else {
    ElNotification({
      message: `怪物閃過你的攻擊`,
      type: "warning",
      position: "bottom-right",
    });
  }
  await sleep(500);
  if (Math.random() > hero.dodge()) {
    ElNotification({
      message: `怪物對你造成了${monsterAttack}傷害`,
      type: "error",
      position: "bottom-right",
    });
    if (hero.health - monsterAttack < 0) {
      hero.health = 0;
    } else {
      hero.health -= monsterAttack;
    }
  } else {
    ElNotification({
      message: `你閃過怪物的攻擊`,
      type: "success",
      position: "bottom-right",
    });
  }

  if (monster.health <= 0) {
    Swal.fire({
      title: `勝利 你戰勝了 ${monster.name} ！`,
      text: `獲得經驗值 50！`,
      confirmButtonText: "確認",
    }).then(() => {
      hero.exp += 50;
      hero.levelUp();
    });
  }

  if (hero.health <= 0) {
    Swal.fire({
      title: `失敗 你被擊敗了！`,
      text: `重整遊戲在玩一次`,
      confirmButtonText: "確認",
    }).then(() => {
      resetGame();
    });
  }
  attacking.value = false;
};

const useItem = () => {
  const potions = store.currentPotions;
  if (store.currentHero?.health && potions.length) {
    const currentPotion = potions.shift();
    ElNotification({
      message: `你使用了${currentPotion?.name}`,
      type: "success",
      position: "bottom-right",
    });
    store.currentHero.useItem(currentPotion);
  }
};

if (store.currentHero === null) {
  resetGame();
}
</script>

<template>
  <div>
    <HeroBlock
      class="my-20px"
      :hero="store.currentHero"
      :potions="store.currentPotions"
    />
    <div>
      <div class="action cursor-pointer">
        <h3 v-if="checkIsNext()" class="search-enemy" @click="findEnemy">
          搜尋怪物
        </h3>
        <div class="mx-auto text-center flex justify-center" v-else>
          <div class="attack mr-20px">
            <el-button
              @click="battle"
              color="#f8b700"
              size="large"
              :disabled="attacking"
              >開始攻擊</el-button
            >
          </div>
          <div class="item mr-20px">
            <el-button color="#f8b700" size="large" @click="useItem"
              >使用道具</el-button
            >
          </div>
          <div class="skill">
            <el-button color="#f8b700" size="large">使用技能</el-button>
          </div>
        </div>
      </div>
      <img class="arena-img" src="@/assets/img/arena.png" alt="" />
    </div>
    <MonsterBlock
      v-if="!checkIsNext()"
      class="my-20px"
      :monster="store.currentEnemy"
    />
  </div>
</template>

<style lang="scss" scoped>
.arena-img {
  width: 100%;
  height: 300px;
  background-color: #1d373d;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  object-fit: cover;
}

.action {
  background-color: #3c1d3c;
  height: 100px;
  line-height: 100px;
  text-align: center;
  .attack {
  }
  h3 {
    color: aliceblue;
    font-size: 40px;
  }
  &:hover {
    background-color: #a00637;
  }
}
</style>
