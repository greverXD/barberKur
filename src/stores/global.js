import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    // Определяем initialServices и initialBarbers в начале
    const initialServices = [
      {
        moreLabel: 'Удлинённая стрижка 1',
        timeWork: '40 мин',
        text: 'Стильная стрижка для волос от 4 см, создающая объем и текстуру. Выполняется ножницами с аккуратной окантовкой триммером для элегантного образа.',
        moneyOne: '40',
        moneyTwo: '45',
      },
      {
        moreLabel: 'Удлинённая стрижка 2',
        timeWork: '60 мин',
        text: 'Креативная стрижка для средней длины волос, подчеркивающая индивидуальность. Ножницы и триммер обеспечивают четкие линии и ухоженный вид.',
        moneyOne: '50',
        moneyTwo: '55',
      },
      {
        moreLabel: 'Удлинённая стрижка 3',
        timeWork: '75 мин',
        text: 'Стрижка для длинных волос, создающая гармоничную форму. Полностью ножничная техника с финальной окантовкой для максимальной точности.',
        moneyOne: '60',
        moneyTwo: '65',
      },
      {
        moreLabel: 'Удлинённая стрижка 4',
        timeWork: '75 мин',
        text: 'Современная стрижка для волос средней и большей длины. Ножницы формируют объем, а триммер добавляет четкость для стильного результата.',
        moneyOne: '60',
        moneyTwo: '65',
      },
      {
        moreLabel: 'Удлинённая стрижка 5',
        timeWork: '75 мин',
        text: 'Эксклюзивная стрижка для длинных волос, создающая сложные текстуры. Ножничная работа с триммером для идеальной формы и аккуратности.',
        moneyOne: '60',
        moneyTwo: '65',
      },
      {
        moreLabel: 'Стрижка бороды и усов',
        timeWork: '30 мин',
        text: 'Профессиональное оформление бороды и усов с триммером и бритвой. Уходовые средства обеспечивают мягкость и ухоженный вид.',
        moneyOne: '25',
        moneyTwo: '30',
      },
      {
        moreLabel: 'Классическая мужская стрижка',
        timeWork: '45 мин',
        text: 'Аккуратная стрижка для коротких волос, идеальная для делового стиля. Машинка и ножницы создают четкий и практичный образ.',
        moneyOne: '35',
        moneyTwo: '40',
      },
      {
        moreLabel: 'Укладка волос',
        timeWork: '20 мин',
        text: 'Стайлинг волос с использованием премиум-средств для объема и фиксации. Подходит для создания яркого образа на любой случай.',
        moneyOne: '20',
        moneyTwo: '25',
      },
    ];

    const initialBarbers = [
      {
        id: 1,
        name: 'Анна Иванова',
        role: 'Топ-мастер',
        schedule: {
          '2025-08-21': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
          '2025-08-22': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
          '2025-08-23': ['12:00', '13:00', '14:00', '15:00', '16:00'],
        },
        img: '/src/assets/two.png',
        availableServices: [
          'Удлинённая стрижка 1',
          'Удлинённая стрижка 2',
          'Стрижка бороды и усов',
          'Укладка волос',
        ],
        bio: 'Опытный мастер с 10-летним стажем, специализируется на удлинённых стрижках.',
        reviews: [
          { id: 1, stars: 5, comment: 'Отличная стрижка, очень довольна!' },
          { id: 2, stars: 4, comment: 'Хорошая работа, рекомендую.' },
        ],
      },
      {
        id: 2,
        name: 'Михаил Петров',
        role: 'Мастер',
        schedule: {
          '2025-08-24': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
          '2025-08-25': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
          '2025-08-26': ['12:00', '13:00', '14:00', '15:00', '16:00'],
        },
        img: '/src/assets/three.png',
        availableServices: [
          'Удлинённая стрижка 3',
          'Удлинённая стрижка 4',
          'Классическая мужская стрижка',
          'Стрижка бороды и усов',
        ],
        bio: 'Мастер с вниманием к деталям, работает с любыми типами волос.',
        reviews: [
          { id: 1, stars: 3, comment: 'Неплохо, но ожидал большего.' },
        ],
      },
      {
        id: 3,
        name: 'Елена Смирнова',
        role: 'Топ-мастер',
        schedule: {
          '2025-08-27': ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
          '2025-08-28': ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
          '2025-08-29': ['12:00', '13:00', '14:00'],
        },
        img: '/src/assets/four.png',
        availableServices: [
          'Удлинённая стрижка 1',
          'Удлинённая стрижка 5',
          'Укладка волос',
          'Классическая мужская стрижка',
        ],
        bio: 'Профессионал в создании стильных образов.',
        reviews: [],
      },
    ];

    // Дефолтный массив времени от 10:00 до 22:00 с шагом в час
    const defaultTimes = [
      '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 
      '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
    ];

    // Теперь получаем данные из localStorage
    const savedServices = localStorage.getItem('services');
    const savedBarbers = localStorage.getItem('barbers');
    const savedBookings = localStorage.getItem('bookings');

    console.log('Saved barbers from localStorage:', savedBarbers);
    console.log('Initial barbers:', initialBarbers);

    let barbers;
    try {
      barbers = savedBarbers ? JSON.parse(savedBarbers) : initialBarbers;
    } catch (e) {
      console.error('Error parsing savedBarbers:', e);
      barbers = initialBarbers;
    }
    console.log('Loaded barbers:', barbers);

    return {
      selectedBlocks: [],
      selectedMaster: null,
      selectedTime: null,
      selectedDate: null,
      bookings: savedBookings ? JSON.parse(savedBookings) : [],
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
      barbers,
      services: savedServices ? JSON.parse(savedServices) : initialServices,
      defaultTimes,
    };
  },
  actions: {
    addSelectedBlock(block) {
      if (!this.selectedBlocks.some(b => b.moreLabel === block.moreLabel)) {
        this.selectedBlocks.push(block);
        console.log('Added service:', block, 'Current selectedBlocks:', this.selectedBlocks);
      }
    },
    removeSelectedBlock(moreLabel) {
      this.selectedBlocks = this.selectedBlocks.filter(b => b.moreLabel !== moreLabel);
      console.log('Removed service:', moreLabel, 'Current selectedBlocks:', this.selectedBlocks);
    },
    clearSelectedBlocks() {
      this.selectedBlocks = [];
      console.log('Cleared all services, selectedBlocks:', this.selectedBlocks);
    },
    setSelectedMaster(master) {
      this.selectedMaster = master;
      console.log('Set master:', master, 'Current selectedMaster:', this.selectedMaster);
      console.log('Master schedule:', master.schedule);
    },
    setSelectedTime(time) {
      this.selectedTime = time;
      console.log('Set time:', time, 'Current selectedTime:', this.selectedTime);
    },
    setSelectedDate(date) {
      this.selectedDate = date;
      console.log('Set date:', date, 'Current selectedDate:', this.selectedDate);
      // Устанавливаем дефолтное время из defaultTimes
      if (!this.selectedTime) {
        const defaultTime = this.defaultTimes[0]; // Первое время: '10:00'
        this.setSelectedTime(defaultTime);
        console.log('Set default time:', defaultTime);
      }
    },
    clearSelectedMaster() {
      this.selectedMaster = null;
      // Удаляем сброс selectedTime, чтобы сохранить время
      console.log('Cleared master, selectedMaster:', this.selectedMaster, 'selectedTime:', this.selectedTime);
    },
    clearSelectedTime() {
      this.selectedTime = null;
      console.log('Cleared time, selectedTime:', this.selectedTime);
    },
    clearSelectedDate() {
      this.selectedDate = null;
      console.log('Cleared date, selectedDate:', this.selectedDate);
    },
    updateBookingData(field, value) {
      this.bookingData[field] = value;
      console.log('Updated booking data:', field, value, 'Current bookingData:', this.bookingData);
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
      console.log('Cleared booking data, bookingData:', this.bookingData);
    },
    updateLoginData(field, value) {
      this.loginData[field] = value;
      console.log('Updated login data:', field, value, 'Current loginData:', this.loginData);
    },
    clearLoginData() {
      this.loginData = {
        phone: '',
        email: '',
        password: '',
      };
      console.log('Cleared login data, loginData:', this.loginData);
    },
    clearAll() {
      this.selectedBlocks = [];
      this.selectedMaster = null;
      this.selectedTime = null;
      this.selectedDate = null;
      this.clearBookingData();
      this.clearLoginData();
      console.log('Cleared all data, state:', this.$state);
    },
    addBooking(booking) {
      this.bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(this.bookings));
      console.log('Added booking:', booking, 'Current bookings:', this.bookings);
    },
    addBarber(barber) {
      this.barbers.push(barber);
      localStorage.setItem('barbers', JSON.stringify(this.barbers));
      console.log('Added barber:', barber, 'Current barbers:', this.barbers);
    },
    updateBarber(updatedBarber) {
      const index = this.barbers.findIndex(b => b.id === updatedBarber.id);
      if (index !== -1) {
        this.barbers[index] = updatedBarber;
        localStorage.setItem('barbers', JSON.stringify(this.barbers));
        console.log('Updated barber:', updatedBarber, 'Current barbers:', this.barbers);
      }
    },
    deleteBarber(id) {
      this.barbers = this.barbers.filter(b => b.id !== id);
      localStorage.setItem('barbers', JSON.stringify(this.barbers));
      console.log('Deleted barber id:', id, 'Current barbers:', this.barbers);
    },
    addService(service) {
      this.services.push(service);
      localStorage.setItem('services', JSON.stringify(this.services));
      console.log('Added service:', service, 'Current services:', this.services);
    },
    updateService(updatedService, oldMORELabel) {
      const index = this.services.findIndex(s => s.moreLabel === oldMORELabel);
      if (index !== -1) {
        this.services[index] = updatedService;
        localStorage.setItem('services', JSON.stringify(this.services));
        console.log('Updated service:', updatedService, 'Current services:', this.services);
      }
    },
    deleteService(moreLabel) {
      this.services = this.services.filter(s => s.moreLabel !== moreLabel);
      localStorage.setItem('services', JSON.stringify(this.services));
      console.log('Deleted service:', moreLabel, 'Current services:', this.services);
    },
    getAverageRating(masterId) {
      const master = this.barbers.find(b => b.id === masterId);
      if (!master || !master.reviews || master.reviews.length === 0) {
        return 0;
      }
      const totalStars = master.reviews.reduce((sum, review) => sum + review.stars, 0);
      const average = (totalStars / master.reviews.length).toFixed(1);
      console.log('Calculated average rating for masterId:', masterId, 'Average:', average);
      return average;
    },
    addReview(masterId, review) {
      const master = this.barbers.find(b => b.id === masterId);
      if (master) {
        if (!master.reviews) master.reviews = [];
        master.reviews.push({
          id: master.reviews.length + 1,
          stars: review.stars,
          comment: review.comment || '',
        });
        localStorage.setItem('barbers', JSON.stringify(this.barbers));
        console.log('Added review for masterId:', masterId, 'Review:', review, 'Current reviews:', master.reviews);
      }
    },
    getBarberSchedule(barberId, date) {
      console.log('Looking for master with id:', barberId);
      console.log('All barbers:', this.barbers);
      const master = this.barbers.find(b => b.id === barberId);
      if (!master || !date) {
        console.log(`No master found for id ${barberId} or no date provided: ${date}`);
        return [];
      }
      console.log('Master found:', master);
      console.log('Master schedule:', master.schedule);
      console.log(`Schedule for ${date}:`, master.schedule[date]);
      return master.schedule[date] || [];
    },
    isFullyBooked() {
      const selectedServices = this.selectedBlocks.map(block => block.moreLabel);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let availableBarbers = this.barbers;
      if (selectedServices.length > 0) {
        availableBarbers = availableBarbers.filter(master =>
          selectedServices.every(service => master.availableServices.includes(service))
        );
      }

      for (const barber of availableBarbers) {
        for (const date in barber.schedule) {
          const scheduleDate = new Date(date);
          if (scheduleDate >= today && barber.schedule[date].length > 0) {
            return false;
          }
        }
      }

      return true;
    },
  },
});