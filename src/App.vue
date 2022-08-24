<template>
  <div>
    <navbar-component @route="path_change" />
    <appbar-component v-if="show_appbar" />
  </div>
</template>

<script>
import NavbarComponent from "@/components/Navbar";
import AppbarComponent from "@/components/Appbar";

export default {
  components: {
    NavbarComponent,
    AppbarComponent,
  },
  data() {
    return {
      show_appbar: false,
    };
  },
  methods: {
    path_change(to) {
      this.show_appbar = to.includes("/timetable") ? false : true;
      console.log(to);
      console.log(this.show_appbar);
    },
  },
};
</script>
