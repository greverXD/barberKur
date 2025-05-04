<script setup>
import people from "@/assets/people.png";
import calendar from "@/assets/calendar.png";
import list from "@/assets/list.png";
import arrow from "@/assets/arrow.png";
import InputBlock from "@/components/inputBlock.vue";
import People from "@/components/people.vue";
import ButtonRecord from "@/components/ui/buttonRecord.vue";
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const peoples = [
  {
    name:"Георгий",
    number:"+375295911986"
  }
]
const items =[
  {
    img: people,
    label:t('myRecords'),
    icon:arrow,
    
    link: 'record'
  },
  {
    img: calendar,
    label:t('myRecords'),
    icon:arrow,
    link: 'sub'
  },
  {
    img: list,
    label:"Сертификаты",
    icon:arrow,
    link: 'cer'
  },
  {
    img: list,
    label:"Выйти",
    icon:"",
    
  }
  
]
</script>

<template>

<div class="w-[40vw] h-auto   mx-auto">
    <div class="flex rounded-full bg-gray-400 w-[5vw] h-[10vh] items-center justify-center">
      <img :src = "img" class=" w-[1.5vw] h-[3vh]">
       </div>

    <div class="flex flex-col gap-y-2 mb-[2vh]">
     <div class="flex items-center gap-x-4"><p class="text-4xl">Город</p><img :src="arrow" class="w-[1.5vw] h-[3vh] mt-[10px] "></div>
     <p class="text-1xl text-bold">Улица</p>
   </div>


<People v-for="(people,index) in peoples"
 :key="index"
 :name="people.name"
 :number="people.number"
/>
   <InputBlock v-for="(item,index) in items" 
            :key="index"
            :label="item.label"
            :img="item.img"
            :icon="item.icon"
            :perem="item.perem"
            :link="item.link"
            />

<ButtonRecord/>
</div>

</template>