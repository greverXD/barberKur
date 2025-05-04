<script setup>
import { ref, computed } from 'vue';
import { useGlobalStore } from '@/stores/global';

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

// Проверяем, доступна ли услуга для выбранного специалиста
const isServiceAvailable = computed(() => {
  if (!store.selectedMaster) return true; // Если специалист не выбран, все услуги доступны
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
          {{ toggle ? 'скрыть' : 'ещё' }}
        </button>
      </div>
    </div>
    <p>{{ moneyOne }}-{{ moneyTwo }}</p>
  </div>
</template>

<style scoped>
</style>