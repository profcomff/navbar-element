<template>
  <navbar-mobile :buttons="buttons" :active="active" @navigate="
    (i) => {
      active = i;
    }
  " v-if="mobile" />
  <navbar-desktop :buttons="buttons" :active="active" @navigate="
    (i) => {
      active = i;
    }
  " v-else />
</template>

<script>
import NavbarMobile from "./NavbarMobile.vue";
import NavbarDesktop from "./NavbarDesktop.vue";

export default {
  components: { NavbarMobile, NavbarDesktop },
  name: "navbar-main",
  data() {
    return {
      buttons: [],
      active: 0,
    };
  },
  props: {
    mobile: Boolean,
  },
  watch: {
    active: function (newValue, oldValue) {
      this.$emit("navigate-url", this.buttons[newValue].path, this.buttons[oldValue].path);
      this.$router.push(this.buttons[newValue].path);
    },
  },
  methods: {
    checkButtonState() {
      if (
        (window.location.pathname === "") |
        (window.location.pathname === "/")
      ) {
        this.active = 1;
      } else {
        this.buttons.forEach((element, index) => {
          if (this.$route.path.startsWith(element.path)) {
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
  },
};
</script>

<style>

</style>
