<template>
  <div>
    <navbar-component @route="path_change" />
    <appbar-component v-if="show_appbar" />
    <app-menu v-if="show_appmenu"></app-menu>
  </div>
</template>

<script>
import NavbarComponent from "@/components/Navbar";
import AppbarComponent from "@/components/Appbar";
import AppMenu from "@/components/AppMenu";

export default {
  components: {
    NavbarComponent,
    AppbarComponent,
    AppMenu
  },
  data() {
    return {
      show_appbar: false,
    };
  },
  methods: {
    path_change(to) {
      this.show_appbar = to.includes("/timetable") ? false : true;
      this.show_appmenu = to.includes("/apps") ? true : false;
    },
  },
  beforeMount() {
    this.path_change(window.location.pathname);
  }
};
</script>
