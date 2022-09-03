<template>
  <navbar-mobile
    :buttons="buttons"
    :active="active"
    @navigate="
      (i) => {
        active = i;
      }
    "
    v-if="mobile"
  />
  <navbar-desktop
    :buttons="buttons"
    :active="active"
    @navigate="
      (i) => {
        active = i;
      }
    "
    v-else
  />
</template>

<script>
import * as singleSpa from "single-spa";
import NavbarMobile from "./NavbarMobile.vue";
import NavbarDesktop from "./NavbarDesktop.vue";

export default {
  components: { NavbarMobile, NavbarDesktop },
  name: "navbar-component",
  data() {
    return {
      buttons: [],
      active: -1,
    };
  },
  props: {
    mobile: Boolean,
  },
  watch: {
    active: function () {
      let button = this.buttons[this.active];
      this.$emit("route", button.path);
      singleSpa.navigateToUrl(button.path);
    },
  },
  async beforeMount() {
    try {
      // Пытаемся быстро загрузить из кэша
      let cached = localStorage.getItem("navbar-buttons");
      if (cached) this.buttons = JSON.parse(cached);
    } catch {
      // No cache, pass
    }
    // Подгружаем навбар в кэш
    try {
      try {
        let res = await fetch(`${process.env.VUE_APP_API_NAVBAR}/navbar`);
        this.buttons = await res.json();
      } catch (err) {
        this.buttons = JSON.parse(localStorage.getItem("navbar-buttons"));
        console.debug(err);
      }
    } catch (err) {
      console.debug(err);
    } finally {
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
