<template>
  <navbar-top-plain v-bind:options="options" v-if="layoutName == 'plain'" />
  <navbar-top-back v-bind:options="options" v-else-if="layoutName == 'back'" />
  <navbar-top-calendar v-bind:options="options" v-else-if="layoutName == 'calendar'" />
</template>

<script>
import NavbarTopBack from "@/components/NavbarTopBack.vue";
import NavbarTopPlain from "@/components/NavbarTopPlain.vue";
import NavbarTopCalendar from "@/components/NavbarTopCalendar.vue";

export default {
  data: () => ({
    layoutName: "plain",
    options: {},
  }),
  components: {
    NavbarTopBack,
    NavbarTopPlain,
    NavbarTopCalendar,
  },
  beforeMount() {
    document.getElementsByTagName("body")[0].style.marginTop = "56px";
    document.addEventListener("change-header-layout", (e) => {
      this.layoutName = e.detail.layoutName;
      this.options = e.detail;
    });
  },
};
</script>
