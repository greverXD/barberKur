<script setup>
import { ref, computed } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const localLang = useStorage('app-locale', 'ru');
const store = useGlobalStore();
const props = defineProps({
  moreLabel: String,
  text: String,
  timeWork: String,
  moneyOne: String,
  moneyTwo: String,
});

const toggle = ref(false);

const completed = computed({
  get() {
    return store.selectedBlocks.some(block => block.moreLabel === props.moreLabel);
  },
  set(value) {
    if (value) {
      store.addSelectedBlock({
        moreLabel: props.moreLabel,
        text: props.text,
        timeWork: props.timeWork,
        moneyOne: props.moneyOne,
        moneyTwo: props.moneyTwo,
        completed: true,
      });
    } else {
      store.removeSelectedBlock(props.moreLabel);
    }
  },
});

const isServiceAvailable = computed(() => {
  if (!store.selectedMaster) return true;
  return store.selectedMaster.availableServices.includes(props.moreLabel);
});
</script>

<template>
  <div v-if="isServiceAvailable">
    <div class="flex w-[40vw] justify-between">
      <p>{{ moreLabel }}</p>
      <input
        type="checkbox"
        v-model="completed"
        class="w-[3vw] h-[3vh]"
      />
    </div>
    <div>
      <div>
        {{ timeWork }} {{ toggle ? props.text : props.text.slice(0, 50) + '...' }}
        <button @click="toggle = !toggle">
          {{ toggle ? t('hide') : t('more') }}
        </button>
      </div>
    </div>
    <p>{{ moneyOne }}-{{ moneyTwo }}</p>
  </div>
</template>

<style scoped>
</style>