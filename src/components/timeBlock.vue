<script setup>
import { useGlobalStore } from '@/stores/global';
import { RouterLink } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const store = useGlobalStore();
</script>

<template>
  <div
    v-if="store.selectedBlocks.length"
    class="fixed bottom-0 z-50 bg-white rounded-lg shadow-md mx-auto"
  >
    <div class="flex w-[40vw] flex-row justify-between gap-y-4">
      <div>
        <div>
          <ul>
            <li v-for="(block, index) in store.selectedBlocks" :key="index">
              {{ block.moreLabel }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <p class="text-gray-600">{{ formattedTime }}</p>
        </div>
        <div>
          <p class="text-gray-600">
            {{ priceRange.min }}-{{ priceRange.max }} {{ t('currency') }}
          </p>
        </div>
      </div>
    </div>

    <router-link to="/master">
      <div class="flex justify-center w-[40vw] bg-black text-white">
        <button>{{ t('book') }}</button>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
</style>