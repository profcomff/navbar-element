<template>
  <div class="container">
    <ui-navigation-bar content-selector=".container" stacked>
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
};
</script>

<style lang="scss" scoped>
$height: "100px";
@use 'balm-ui/components/navigation-bar';
</style>
