import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    selectedBlocks: [], // Выбранные услуги
    selectedMaster: null, // Выбранный специалист
    selectedTime: null, // Выбранное время
    bookingData: {
      email: '',
      phone: '',
      name: '',
      comment: '',
      agreement1: false,
      agreement2: false,
    },
    loginData: {
      phone: '',
      email: '',
      password: '',
    },
  }),
  actions: {
    addSelectedBlock(block) {
      if (!this.selectedBlocks.some(b => b.moreLabel === block.moreLabel)) {
        this.selectedBlocks.push(block);
      }
    },
    removeSelectedBlock(moreLabel) {
      this.selectedBlocks = this.selectedBlocks.filter(b => b.moreLabel !== moreLabel);
    },
    clearSelectedBlocks() {
      this.selectedBlocks = [];
    },
    setSelectedMaster(master) {
      this.selectedMaster = master;
    },
    setSelectedTime(time) {
      this.selectedTime = time;
    },
    clearSelectedMaster() {
      this.selectedMaster = null;
    },
    clearSelectedTime() {
      this.selectedTime = null;
    },
    updateBookingData(field, value) {
      this.bookingData[field] = value;
    },
    clearBookingData() {
      this.bookingData = {
        email: '',
        phone: '',
        name: '',
        comment: '',
        agreement1: false,
        agreement2: false,
      };
    },
    updateLoginData(field, value) {
      this.loginData[field] = value;
    },
    clearLoginData() {
      this.loginData = {
        phone: '',
        email: '',
        password: '',
      };
    },
    clearAll() {
      this.selectedBlocks = [];
      this.selectedMaster = null;
      this.selectedTime = null;
      this.clearBookingData();
      this.clearLoginData();
    },
  },
});