<template>
  <div>
    <navbar-component @route="path_change" :mobile="isMobile()" />
    <appbar-component v-if="show_appbar" :mobile="isMobile()" />
    <app-menu @route="capture_navigation" v-if="show_appmenu" :mobile="isMobile()"></app-menu>
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
    AppMenu,
  },
  data() {
    return {
      show_appbar: false,
    };
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    capture_navigation(from, to) {
      if (from === to) return;
      try {
        fetch(`${process.env.VUE_APP_API_MARKETING}/action`, {
          method: "POST",
          cache: "no-cache",
          redirect: "follow",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: localStorage.getItem("marketing-id"),
            action: "route to",
            path_from: from,
            path_to: to,
          }),
        });
      } catch {
        // Failed, skips
      }
    },
    path_change(to) {
      this.capture_navigation(window.location.pathname, to);
      this.show_appbar = to.includes("/timetable") ? false : true;
      this.show_appmenu = to.includes("/apps") ? true : false;
    },
  },
  beforeMount() {
    this.path_change(window.location.pathname);
  },
};
</script>
