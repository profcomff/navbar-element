<template>
  <div>
    <appbar-component v-if="show_appbar" />
    <navbar-component />
  </div>
</template>

<script>
import NavbarComponent from "@/components/Navbar";
import AppbarComponent from "@/components/Appbar";

export default {
  components: {
    NavbarComponent,
    AppbarComponent
  },
  data() {
    return {
      show_appbar: false
    }
  },
  watch: {
    $route(to) {
      if (to.includes("timetable"))
        this.show_appbar = false
      else
        this.show_appbar = true;
    },
  },
};
</script>
