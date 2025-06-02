<script setup>
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');
defineProps({
  msg: {
    required: true,
  },
});
</script>

<template>
  <div class="w-[40vw] h-[50vh] mx-auto">
    <div class="flex w-[40vw] h-[10vh] justify-end">
      <div class="flex items-center justify-center">
        <img :src="people" class="w-[1.5vw] h-[3vh]">
      </div>
    </div>
    <div class="flex rounded-full bg-gray-400 w-[5vw] h-[10vh] items-center justify-center">
      <img :src="people" class="w-[1.5vw] h-[3vh]">
    </div>
    <div class="flex flex-col gap-y-2 mb-[2vh]">
      <div class="flex items-center gap-x-4">
        <p class="text-4xl">{{ t('city') }}</p>
        <router-link to="/hehe">
          <img :src="arrow" class="w-[1.5vw] h-[3vh] mt-[10px]">
        </router-link>
      </div>
      <p class="text-1xl text-bold">{{ t('street') }}</p>
    </div>
    <div class="flex gap-y-2 flex-col">
      <InputBlock
        v-for="(item, index) in items"
        :key="index"
        :label="item.label"
        :img="item.img"
        :icon="item.icon"
        :link="item.link"
      />
    </div>
  </div>
</template>

<style scoped>
</style>