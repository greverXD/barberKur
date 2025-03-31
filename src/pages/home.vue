<script setup>
import people from "@/assets/people.png";
import calendar from "@/assets/calendar.png";
import list from "@/assets/list.png";
import { RouterLink } from 'vue-router'
import arrow from "@/assets/arrow.png";
import InputBlock from "@/components/inputBlock.vue";


const items =[
  {
    img: people,
    label:"Выбрать специалиста",
    icon:arrow,
    
    link: 'hehe'
  },
  {
    img: calendar,
    label:"Выбрать дату и время",
    icon:arrow,
    link: ''
  },
  {
    img: list,
    label:"Выбрать услуги",
    icon:arrow,
    link: ''
  },
]


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
            :perem="item.perem"
            :link="item.link"
            />
</div>
</div> 
</template>