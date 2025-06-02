<script setup>
import arrow from "@/assets/arrow.png";
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');
</script>

<template>
  <div class="flex flex-row w-[40vw] h-[50vh] mx-auto">
    <router-link to="/login">
      <img :src="arrow" class="w-[1.5vw] h-[3vh] rotate-90 mt-[10px]" />
    </router-link>
    <p class="font-bold text-2xl mt-[0.5vh]">{{ t('myCertificates') }}</p>
  </div>
</template>