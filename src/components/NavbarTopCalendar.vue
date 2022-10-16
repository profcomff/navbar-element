<template>
  <header>
    <div class="date" v-click-outside="closeAll">
      <button
        v-if="!options.disabled"
        class="date options"
        :class="showCalendar ? 'opened' : ''"
        @click="showCalendar = !showCalendar"
      >
        <div class="toggler-text">
          <span>{{ this.formatDate(this.date) }}</span>
          <!-- <span>204 группа</span> -->
        </div>
        <span class="material-symbols-sharp expander"> expand_more </span>
      </button>
      <div v-if="options.disabled" class="date">{{ options.text }}</div>
      <div v-if="showCalendar" class="date-nav">
        <DatePicker class="calendar" v-model="date" />
      </div>
    </div>
    <options-button
      icon="today"
      @click="date = new Date()"
      v-bind:disabled="options.disabled"
    />
    <dropdown-menu
      v-bind:menu="options.menu"
      v-bind:disabled="options.disabled"
    />
  </header>
</template>

<script>
import "v-calendar/dist/style.css";
import vClickOutside from "click-outside-vue3";
import { DatePicker } from "v-calendar";
import dropdownMenu from "@/components/DropdownMenu";
import optionsButton from "@/components/OptionsButton";

export default {
  name: "navbar-top",
  components: {
    DatePicker,
    dropdownMenu,
    optionsButton,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data: () => ({
    date: new Date(),
    showCalendar: false,
    showOptions: false,
    dateWatcher: null,
  }),
  props: {
    options: {
      type: Object,
      default: () => ({
        text: "Твой физфак!",
        menu: [],
        disabled: true,
      }),
    },
  },
  methods: {
    closeAll() {
      this.showCalendar = false;
    },
    formatDate(date) {
      if (this.date) {
        var options = {
          month: "long",
          day: "numeric",
        };
        return date.toLocaleString("ru", options);
      }
    },
    syncDate() {
      document.dispatchEvent(
        new CustomEvent("change-date", { detail: { date: this.date } })
      );
    },
  },

  watch: {
    date(newDate, oldDate) {
      if (!newDate) this.date = oldDate;
      this.syncDate();
      try {
        fetch(`${process.env.VUE_APP_API_MARKETING}/action`, {
          method: "POST",
          cache: "no-cache",
          redirect: "follow",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: localStorage.getItem("marketing-id"),
            action: "viewed timetable on new date",
            path_from: "/timetable",
            path_to: "/timetable",
          }),
        });
      } catch {
        //Failed, skips
      }
    },
  },
  beforeMount() {
    document.addEventListener("sync-date", this.syncDate);
    document.addEventListener("change-main-date", (e) => {
      this.date = e.detail.date;
    });
  },
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
  color: var(--bs-on-primary);
  background: none;
  border: none;
  margin-right: auto;
  display: flex;
  flex-direction: row;
}

.toggler-text {
  display: flex;
  flex-flow: column nowrap;
}

.material-symbols-sharp {
  font-size: 24px;
}

.expander {
  transition: all 0.2s ease-in;
}
.opened .expander {
  transform: rotate(180deg);
}
</style>
