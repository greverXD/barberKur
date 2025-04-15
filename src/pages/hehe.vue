<script setup>
import people from "@/assets/people.png";
import calendar from "@/assets/calendar.png";
import list from "@/assets/list.png";
import arrow from "@/assets/arrow.png";
import MoreBlock from "@/components/moreBlock.vue";
import { useRouter } from "vue-router";
import CompletedBlock from "@/components/completedBlock.vue";

const items = [
  {
    img: people,
    label: "Выбрать специалиста",
    icon: arrow,
  },
  {
    img: calendar,
    label: "Выбрать дату и время",
    icon: arrow,
  },
  {
    img: list,
    label: "Выбрать услуги",
    icon: arrow,
  },
];

const blocks = [
  {
    moreLabel: "Удлинённая стрижка 1",
    time: "40 мин",
    text: "Длина волос от 4 см и более. Подразумевает под собой массу волос средней длины (и более) по всей голове. Оформляется все исключительно ножницами, с возможным использованием триммера для создания более точной окантовки",
    moneyOne: "40",
    moneyTwo: "45",
  },
  {
    moreLabel: "Удлинённая стрижка 2",
    time: "60 мин",
    text: "Длина волос от 4 см и более. Подразумевает под собой массу волос средней длины (и более) по всей голове. Оформляется все исключительно ножницами, с возможным использованием триммера для создания более точной окантовки",
    moneyOne: "50",
    moneyTwo: "55",
  },
  {
    moreLabel: "Удлинённая стрижка 3",
    time: "75 мин",
    text: "Длина волос от 4 см и более. Подразумевает под собой массу волос средней длины (и более) по всей голове. Оформляется все исключительно ножницами, с возможным использованием триммера для создания более точной окантовки",
    moneyOne: "60",
    moneyTwo: "65",
  },
];

const router = useRouter();

const goToPage = (link) => {
  router.push({ name: link });
};
</script>

<template>
  <div class="w-[40vw] mx-auto py-6">
    <div class="flex gap-x-2">
      <router-link to="/">
        <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
      </router-link>
      <div class="flex flex-col mb-4">
        <div class="flex items-center gap-x-4">
          <p class="text-xl">Город</p>
          <img :src="arrow" class="w-[1vw] h-[2vh] mt-[10px]" />
        </div>
        <p class="text-sm font-bold">Улица</p>
      </div>
    </div>

    <div>
      <p class="font-bold text-2xl">Выбрать услуги</p>
    </div>

    <div class="flex gap-x-2 my-4">
      <button class="rounded-full w-[8vw] h-[5vh] bg-black text-white">
        ТОП-МАСТЕР
      </button>
      <button class="rounded-full w-[5vw] h-[5vh] hover:bg-gray-400">
        МАСТЕР
      </button>
    </div>

    <input
      type="text"
      placeholder="Найти"
      class="w-[35vw] h-[6vh] rounded-xl p-4 mb-4"
    />

    <p class="font-bold text-2xl">ТОП-МАСТЕР</p>

    <div class="flex flex-col gap-y-4">
      <MoreBlock
        v-for="(block, index) in blocks"
        :key="index"
        :more-label="block.moreLabel"
        :text="block.text"
        :time="block.time"
        :money-one="block.moneyOne"
        :money-two="block.moneyTwo"
      />
    </div>

    <CompletedBlock />
  </div>
</template>

<style scoped>
</style>