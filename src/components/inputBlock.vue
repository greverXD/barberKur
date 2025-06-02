<script setup>
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const props = defineProps({
  img: {
    required: true,
  },
  label: {
    required: true,
  },
  icon: {
    required: false,
  },
  perem: {
    required: false,
  },
  link: {
    required: false,
  },
  action: {
    type: Function,
    required: false,
  },
});

const router = useRouter();

const handleClick = () => {
  if (props.action) {
    props.action();
    console.log('InputBlock action triggered:', props.label);
  } else if (props.link) {
    router.push({ name: props.link });
    console.log('Navigating to link:', props.link);
  }
};
</script>

<template>
  <div class="flex w-[35vw] h-[10vh] flex-row justify-between cursor-pointer" @click="handleClick">
    <div class="flex flex-row items-center gap-x-2">
      <div class="flex rounded-full bg-blue-100 w-[2.5vw] h-[5vh] items-center justify-center">
        <img :src="img" class="w-[1.5vw] h-[3vh]">
      </div>
      <div>
        {{ label }}
      </div>
    </div>
    <div class="flex flex-row items-center">
      <div><img v-if="icon" :src="icon" class="w-[1.5vw] h-[3vh] rotate-270"></div>
    </div>
  </div>
</template>

<style scoped>
</style>