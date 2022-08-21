<template>
  <div class="container">
    <ui-navigation-bar content-selector="main" stacked>
      <ui-tabs
        v-model="active"
        type="textWithIcon"
        :items="buttons"
        stacked
        @update:model-value="onChange"
      ></ui-tabs>
    </ui-navigation-bar>
  </div>
</template>

<script>
import * as singleSpa from "single-spa";

export default {
  name: "navbar-bottom",
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
      active: 0,
    };
  },
  methods: {
    onChange(active) {
      let button = this.buttons[active]
      console.log(button);
      singleSpa.navigateToUrl(button.path);
    },
  },
  async beforeMount() {
    try {
      try {
        let res = await fetch("https://navbar.api.profcomff.com/navbar");
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
  },
};
</script>

<style lang="scss">
</style>
