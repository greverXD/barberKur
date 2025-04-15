<script setup>

import {useRouter} from 'vue-router'

const props = defineProps({
  name: String,
  master: String,
  day: String,
  time: String,
  timeDay: String,
  
})


</script>

<template>
 <div class="w-[40vw] h-[50vh]   mx-auto">
  <div class="flex flex-col w-[45vw] h-[18vh] justify-between ">
      
     <div class="flex flex-rows gap-x-4 w-[50vw] h-[4vh]">
         <div class="w-[4vw] h-auto ">
        <img :src="img" class="rounded-full">
         </div>
          <div class="flex flex-col">
            <div clas>
             {{name}}
               </div>

               <div>
             {{master}}
             </div>
          </div> 

          
     <div class="flex flex-row gap-x-4 ml-[30vw]">
      <div>
      i
      </div>
      <div>
      <input type="checkbox">
      </div>

      
     </div>
     </div> 



    <div class="flex mt-[4vh]">
      <div class="h-auto">
  Ближайшее время для записи
  </div>
  <div>
    {{ timeDay }} 
  </div> 
    <div>
    {{ day }} 
    </div> 
</div>

<div class="flex flex-row gap-x-2">
<div class="flex items-center justify-center w-[5vw] h-[5vh] rounded-2xl bg-gray-200 hover:bg-gray-300 duration-300">
      {{time}}
    </div> 

     </div>
    </div> 
 
</div>


</template>

<style scoped>

</style>
