<template>
  <div>
    <navbar-top />
    <navbar-main
      :mobile="isMobile()"
      @navigate-url="
        (newPath, oldPath) => {
          capture_navigation(oldPath, newPath);
        }
      "
    />
  </div>
</template>

<script>
import NavbarMain from "./components/NavbarMain.vue";
import NavbarTop from "./components/NavbarTop.vue";
import swipe from "@/events/swipe";
export default {
  components: { NavbarTop, NavbarMain },
  data() {
    return { show_appbar: false };
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
    async capture_navigation(from, to) {
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
        //Failed, skips
      }
    },
  }, beforeMount() {
      // вызов функции swipe с предварительными настройками
      swipe(document, { maxTime: 800, minTime: 200, maxDist: 150, minDist: 50 });
  },
};
</script>

<style>
span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: rgba(255, 255, 255, 0.7);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
