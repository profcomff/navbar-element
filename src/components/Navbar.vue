<template>
  <navbar-mobile :buttons="buttons" :active="active" @navigate="(i) => {active = i}" v-if="isMobile()" />
  <navbar-desktop :buttons="buttons" :active="active" @navigate="(i) => {active = i}" v-else />
</template>

<script>
import * as singleSpa from "single-spa";
import NavbarMobile from "./NavbarMobile.vue";
import NavbarDesktop from "./NavbarDesktop.vue";

export default {
  components: { NavbarMobile, NavbarDesktop },
  name: "navbar-component",
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  data() {
    return {
      buttons: [
        {
          icon: "calendar_month",
          text: "Расписание",
          path: "/timetable",
        },
        {
          icon: "apps",
          text: "Сервисы",
          path: "/apps",
        },
        {
          icon: "settings",
          text: "Настройки",
          path: "/settings",
        },
      ],
      active: -1,
    };
  },
  watch: {
    active: function () {
      let button = this.buttons[this.active];
      console.log(button);
      singleSpa.navigateToUrl(button.path);
      this.$emit('route', button.path);
    },
  },
  async beforeMount() {
    // Подгружаем навбар в кэш
    try {
      try {
        let res = await fetch(`${process.env.VUE_APP_API_NAVBAR}/navbar`);
        this.buttons = await res.json();
        console.debug("Using online menu set");
      } catch (err) {
        this.buttons = JSON.parse(localStorage.getItem("navbar-buttons"));
        console.debug(err);
        console.debug("Using cached menu set");
      }
    } catch (err) {
      console.debug(err);
      console.debug("Using default menu set");
    } finally {
      console.debug("Caching menu set");
      localStorage.setItem("navbar-buttons", JSON.stringify(this.buttons));
    }

    // Выбираем какая кнопка сейчас активная
    this.buttons.forEach((element, index) => {
      if (element.path == window.location.pathname) {
        this.active = index;
        return;
      }
    });
  },
};
</script>

<style>
</style>
