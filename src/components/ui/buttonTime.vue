<script setup>
const props = defineProps({
  time: {
      required: true
  },
  
});
</script>

<template>
    
    <div class="flex items-center justify-center w-[10vw] h-[5vh] rounded-2xl bg-gray-200 hover:bg-gray-300 duration-300">
      {{time}}
    </div>  
  
</template>