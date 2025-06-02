<script setup>
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const props = defineProps({
  name: String,
  number: Number
});
</script>

<template>
  <div class="w-[40vw] h-auto mx-auto">
    <div class="flex flex-col w-[45vw] h-[18vh] justify-between">
      <div class="flex flex-rows gap-x-4 w-[50vw] h-[4vh]">
        <div class="flex items-center justify-center w-[3vw] h-[6vh] rounded-full bg-gray-200">
          {{ name.charAt(0) }}
        </div>
        <div class="flex flex-col">
          <div>
            {{ name }}
          </div>
          <div>
            {{ number }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>