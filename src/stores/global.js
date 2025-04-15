import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    toggle: false,
    completed: false,
    time: '12:00',
    moneyOne: '23',
    moneyTwo: '124',
    selectedBlocks: [],
  }),
  actions: {
    setToggle(value) {
      this.toggle = value;
    },
    setCompleted(value) {
      this.completed = value;
    },
    setTime(value) {
      this.time = value;
    },
    setMoneyOne(value) {
      this.moneyOne = value;
    },
    setMoneyTwo(value) {
      this.moneyTwo = value;
    },
    addSelectedBlock(block) {
      if (!this.selectedBlocks.some(b => b.moreLabel === block.moreLabel)) {
        this.selectedBlocks.push(block);
      }
    },
    removeSelectedBlock(moreLabel) {
      this.selectedBlocks = this.selectedBlocks.filter(b => b.moreLabel !== moreLabel);
    },
  },
});