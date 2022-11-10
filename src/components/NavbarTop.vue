<template>
  <navbar-top-plain
    class="noselect"
    v-bind:options="options"
    v-if="layoutName == 'plain'"
  />
  <navbar-top-back
    class="noselect"
    v-bind:options="options"
    v-else-if="layoutName == 'back'"
  />
  <keep-alive>
    <navbar-top-calendar
      class="noselect"
      v-bind:options="options"
      v-if="layoutName == 'calendar'"
    />
  </keep-alive>
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

<style scoped>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;   /* Non-prefixed version, currently
  supported by Chrome, Edge, Opera and Firefox */
}
</style>
