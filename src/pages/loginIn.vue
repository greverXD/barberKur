<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import people from "@/assets/people.png";
import calendar from "@/assets/calendar.png";
import list from "@/assets/list.png";
import arrow from "@/assets/arrow.png";
import InputBlock from "@/components/inputBlock.vue";
import ButtonRecord from "@/components/ui/buttonRecord.vue";
import { useI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';

const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');

const router = useRouter();
const user = ref(null);

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});

const logout = () => {
  localStorage.removeItem('user');
  router.push('/loginBy');
};

const goToLogin = () => {
  router.push('/loginBy');
};

const items = [
  {
    img: people,
    label: t('myRecords'),
    icon: arrow,
    link: 'record'
  },
  {
    img: calendar,
    label: t('mySubscription'),
    icon: arrow,
    link: 'sub'
  },
  {
    img: list,
    label: t('myCertificates'),
    icon: arrow,
    link: 'cer'
  },
  {
    img: list,
    label: t('logOut'),
    icon: "",
    action: logout
  }
];
</script>

<template>
  <div class="w-[40vw] h-auto mx-auto">
    <div class="flex rounded-full bg-gray-400 w-[5vw] h-[10vh] items-center justify-center">
      <img :src="people" class="w-[1.5vw] h-[3vh]" />
    </div>

    <div v-if="!user" class="flex flex-col gap-y-2 mb-[2vh]">
      <div class="flex items-center gap-x-4">
        <p class="text-4xl">{{ t('city') }}</p>
        <img :src="arrow" class="w-[1.5vw] h-[3vh] mt-[10px]" />
      </div>
      <p class="text-1xl font-bold">{{ t('street') }}</p>
      <button
        @click="goToLogin"
        class="w-full h-[6vh] rounded-xl bg-black text-white hover:bg-gray-800 mt-4"
      >
        {{ t('login') }}
      </button>
    </div>

    <div v-if="user" class="flex flex-col gap-y-2 mb-[2vh]">
      <div class="flex items-center gap-x-4">
        <p class="text-4xl">{{ t('city') }}</p>
        <img :src="arrow" class="w-[1.5vw] h-[3vh] mt-[10px]" />
      </div>
      <p class="text-1xl font-bold">{{ t('street') }}</p>
      <div class="flex flex-col gap-y-2">
        <p class="text-2xl">{{ user.name }}</p>
        <p class="text-xl">{{ user.email }}</p>
      </div>
    </div>

    <div v-if="user" class="flex flex-col gap-y-2">
      <InputBlock
        v-for="(item, index) in items"
        :key="index"
        :label="item.label"
        :img="item.img"
        :icon="item.icon"
        :link="item.link"
        :action="item.action"
      />
    </div>

    <ButtonRecord v-if="user" />
  </div>
</template>

<style scoped>
</style>