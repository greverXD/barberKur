<script setup>

import {useRouter} from 'vue-router'

const props = defineProps({
    img:{
        required:true,
    },
    label:{
        required:true,
    },
    icon:{
        required:true,
    },
    perem:{
        required:true,
    },
    link:{
        // required:true,
    },
})

const router = useRouter()

const GoToPage = (link) => {
  router.push({
    name: link
  })
}

</script>

<template>
   <div class="flex w-[35vw] h-[10vh]  flex-row justify-between"  @click="GoToPage(link)">
      <div class="flex flex-row  items-center gap-x-2">
        <div class="flex rounded-full bg-blue-100 w-[2.5vw] h-[5vh] items-center justify-center">
      <img :src = "img" class="w-[1.5vw] h-[3vh]">
         </div>
      <div>
        {{label}}
       </div>
       </div>
       
       
       <div class="flex flex-row  items-center">

        
        <div><img :src="icon" class="w-[1.5vw] h-[3vh] rotate-270"></div>
     </div>
   </div> 

</template>

<style scoped>

</style>
