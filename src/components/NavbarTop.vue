<template>
  <header v-if="this.pageId!=1">
    <div v-bind:style="{color: 'white'}">
      Твой Физфак!
    </div>
  </header>
  <header v-else>
    <div class="date" v-click-outside="
      () => {
        this.showCalendar = false;
      }
    ">
      <button v-if="this.$store.state.page" class="btn btn-primary date options" @click="
        () => {
          if (this.$store.state.page) showCalendar = !showCalendar;
        }
      ">
        {{ this.formatDate(this.date) }}
        <span v-if="!showCalendar" class="material-symbols-sharp">
          expand_more
        </span>
        <span v-else class="material-symbols-sharp"> expand_less </span>
      </button>
      <div v-else class="date">Твой ФФ!</div>
      <div v-if="showCalendar && this.$store.state.page" class="date-nav">
        <DatePicker class="calendar" v-model="date" />
      </div>
    </div>
    <button class="btn btn-primary options" @click="date = new Date()" v-bind:disabled="!this.$store.state.page">
      <span class="material-symbols-sharp"> today </span>
    </button>
    <button class="btn btn-primary options" @click="
      () => {
        if (this.$store.state.page) showOptions = !showOptions;
      }
    " v-bind:disabled="!this.$store.state.page">
      <span class="material-symbols-sharp"> more_vert </span>
    </button>
    <div v-if="showOptions && this.$store.state.page" class="options-nav" v-click-outside="
      () => {
        this.showOptions = false;
      }
    ">
      <button class="option" @click="toInit()">Изменить группу</button>
    </div>
  </header>
</template>
<script>
import "v-calendar/dist/style.css";
import vClickOutside from "click-outside-vue3";
import { DatePicker } from "v-calendar";
export default {
  components: {
    DatePicker,
  },
  name: "navbar-top",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      date: this.$store.state.date,
      showCalendar: false,
      showOptions: false,
      pageId: 0,
    };
  },
  watch: {
    date() {
      if (this.date)
        document.dispatchEvent(new CustomEvent('change-date', { detail: this.date }));
    },
  },
  methods: {
    formatDate(date) {
      if (!this.date) this.date = this.$store.state.date;
      var options = {
        month: "long",
        day: "numeric",
      };
      return date.toLocaleString("ru", options);
    },
    resetOverlays() {
      console.log(this.showOptions);
      this.showCalendar = false;
      this.showOptions = false;
    },
    toInit() {
      this.showCalendar = false;
      this.showOptions = false;
      localStorage.removeItem("timetable-group-id");
      this.$router.push("/timetable/init");
    },
  },
  beforeMount() {
    document.addEventListener("change-page", (e) => { this.pageId = e.detail })
  }
};
</script>

<style scoped>
header {
  height: 56px;
  background-color: var(--bs-primary);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  gap: 10px;
  padding: 10px 4%;
  box-shadow: 0px 2px 2px lightgray;
}

.calendar {
  border: none;
}

.date-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background: #fff;
  left: 0;
  top: 0;
  right: 0;
  margin-top: 56px;
  height: min-content;
  z-index: 100;
}

.date {
  color: #fff;
  background: none;
  border: none;
  margin-right: auto;
  display: flex;
  flex-direction: row;
}

.options {
  color: #fff;
  background: none;
  border: none;
  height: 100%;
  align-content: center;
  justify-content: center;
}

.options-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background: #fff;
  width: 60%;
  max-width: 300px;
  top: 0;
  right: 0;
  margin-top: 56px;
  height: min-content;
  z-index: 1;
}

.option {
  border: none;
  background-color: #fff;
  color: black;
  text-decoration: none;
  min-height: 40px;
  width: 100%;
  text-align: left;
  padding: 10px;
}

.options:hover,
:focus {
  opacity: 0.6;
  box-shadow: none;
}

.option:hover,
:focus {
  opacity: 0.6;
}

.material-symbols-sharp {
  font-size: 24px;
}
</style>
