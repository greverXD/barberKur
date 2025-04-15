<script setup>
import { ref } from 'vue';
import { useGlobalStore } from '@/stores/global';

const store = useGlobalStore();
const props = defineProps({
  moreImg: String,
  moreLabel: String,
  text: String,
  time: String,
  moneyOne: String,
  moneyTwo: String,
});

const toggle = ref(false);
const completed = ref(false);

const handleCheckboxChange = () => {
  if (completed.value) {
    store.addSelectedBlock({
      moreLabel: props.moreLabel,
      text: props.text,
      time: props.time,
      moneyOne: props.moneyOne,
      moneyTwo: props.moneyTwo,
    });
  } else {
    store.removeSelectedBlock(props.moreLabel);
  }
};

const displayText = () => {
  return toggle.value ? props.text : props.text.slice(0, 50) + '...';
};
</script>

<template>
  <div>
    <div class="flex w-[40vw] justify-between">
      <p>{{ moreLabel }}</p>
      <input
        type="checkbox"
        v-model="completed"
        @change="handleCheckboxChange"
        class="w-[3vw] h-[3vh]"
      >
    </div>
    <div>
      <div>
        {{ time }} {{ displayText() }}
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