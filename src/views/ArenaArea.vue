<script setup lang="ts">
import { ref } from "vue";
import HeroBlock from "@/components/heroBlock.vue";
import { useRouter } from "vue-router";
import { useCharacterStore } from "@/stores/character";
import Swal from "sweetalert2";
const store = useCharacterStore();
const router = useRouter();
const enemyList = ref([
  ["Goblin", 100, 0, 50, 100, 100],
  ["Troll", 200, 0, 150, 80, 150],
]);
const findEnemy = () => {
  let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(2));
  console.log(enemyList.value[chooseRandomEnemy]);
  Swal.fire({
    title: "Error!",
    text: "Do you want to continue",
    confirmButtonText: "Cool",
  });
};
</script>

<template>
  <div>
    <HeroBlock class="my-20px" :heroSet="store.currentHero"></HeroBlock>
    <div>
      <div class="action cursor-pointer" @click="findEnemy">
        <h3>搜尋怪物</h3>
        <h3>開始攻擊</h3>
      </div>
      <img class="arena-img" src="@/assets/img/arena.png" alt="" />
    </div>
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
  h3 {
    color: aliceblue;
    font-size: 40px;
  }
  &:hover {
    background-color: #a00637;
  }
}
</style>
