<script setup>
defineProps({
  msg: {
    required: true,
  },
})
</script>

<template>
<div class="w-[40vw] h-[50vh]   mx-auto">
  <div class="flex w-[40vw] h-[10vh] justify-end ">
  <div class="flex  items-center justify-center">
      <img :src = "img" class="w-[1.5vw] h-[3vh]">
       </div>
  </div>      
  <div class="flex rounded-full bg-gray-400 w-[5vw] h-[10vh] items-center justify-center">
      <img :src = "img" class=" w-[1.5vw] h-[3vh]">
       </div>
  <div class="flex flex-col gap-y-2 mb-[2vh]">
     <div class="flex items-center gap-x-4"><p class="text-4xl">Город</p><router-link to="/hehe"><img :src="arrow" class="w-[1.5vw] h-[3vh] mt-[10px] "></router-link></div>
     <p class="text-1xl text-bold">Улица</p>
   </div> 
<div class="flex gap-y-2 flex-col">
<InputBlock v-for="(item,index) in items" 
            :key="index"
            :label="item.label"
            :img="item.img"
            :icon="item.icon"
            />
</div>
</div> 
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
