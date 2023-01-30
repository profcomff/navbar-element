<template>
  <navbar-mobile :buttons="buttons" :active="active" @navigate="navigate" v-if="mobile" />
  <navbar-desktop :buttons="buttons" :active="active" @navigate="navigate" v-else />
</template>

<script>
import NavbarMobile from "./NavbarMobile.vue";
import NavbarDesktop from "./NavbarDesktop.vue";
import * as singleSpa from 'single-spa';


export default {
  components: { NavbarMobile, NavbarDesktop },
  name: "navbar-main",
  data: () => ({
    buttons: [],
    active: 0,
  }),
  props: {
    mobile: Boolean,
  },
  methods: {
    navigate(newValue) {
      this.$emit("navigate-url", this.buttons[newValue].path, this.buttons[this.active].path);
      singleSpa.navigateToUrl(this.buttons[newValue].path);
      this.active = newValue;
    },
    checkButtonState() {
      if (
        (window.location.pathname === "") |
        (window.location.pathname === "/")
      ) {
        this.active = 1;
      } else {
        this.buttons.forEach((element, index) => {
          if (window.location.pathname.startsWith(element.path)) {
            this.active = index;
            return;
          }
        });
      }
    }
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
    this.checkButtonState()
    // Выбираем какая кнопка сейчас активная
    document.addEventListener("change-page", this.checkButtonState)
    console.log("Buttons: ", this.buttons)
    this.loaded = true;
  },
};
</script>

<style>

</style>
