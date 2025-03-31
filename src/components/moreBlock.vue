<script setup>
import { ref } from "vue";

const props = defineProps({
    moreLabel: {
        required: true
    },
    time: {
        required: true
    },
    text: {
        required: true
    },
    moneyOne: {
        required: true
    },
    moneyTwo: {
        required: true
    }
});

let toggle = ref(false)

const displayText = () =>{
    return toggle.value ? props.text : props.text.slice(0,50) + "..."
}
</script>

<template>
    <div>
        <img :src="moreImg" class="w-[40vw] h-[30vh] rounded-xl">
        <div class="flex w-[40vw] justify-between">
            <p>{{ moreLabel }}</p> 
            <input type="checkbox" v-model="completed" class="w-[3vw] h-[3vh] bg-black">
        </div>
        <div>
            <div>
                {{ time }} {{ displayText() }}

                <button
                @click="toggle=!toggle"
                >{{ toggle ? "скрыть" : "ещё"}}</button>
                
            </div>
        </div>
        <p>{{ moneyOne }}-{{ moneyTwo }}</p> 
    </div>    
</template>

<style scoped>
</style>
