<template>
  <ul role="navigation" class="nav-bar">
    <li
      class="nav-button"
      v-for="b in buttons"
      :key="b.path"
      @click="navigate(b.path)"
    >
      <span
        class="nav-icon material-symbols-sharp"
        v-if="b.icon.font !== undefined"
        v-text="b.icon.font"
      />
      <span class="nav-title" v-text="b.name" />
    </li>
  </ul>
</template>

<script>
import * as singleSpa from "single-spa";

export default {
  name: "navbar",
  data() {
    return {
      buttons: [
        {
          icon: { font: "calendar_month" },
          name: "Расписание",
          path: "/timetable",
        },
        {
          icon: { font: "apps" },
          name: "Сервисы",
          path: "/services",
        },
        {
          icon: { font: "settings" },
          name: "Настройки",
          path: "/settings",
        },
      ],
    };
  },
  methods: {
    navigate(addr) {
      singleSpa.navigateToUrl(addr);
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

<style>
@import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200);

.material-symbols-sharp {
  font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 200, "opsz" 48;
}

.nav-bar {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  background-color: #548ab1;
  overflow: hidden;
  position: fixed;
  padding: 0;
  margin: 0;
}

.nav-bar .nav-button {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  list-style-type: none;
  color: #f2f2f2;
  text-align: center;
  min-width: 80px;
  max-width: 168px;
  width: 100%;
  height: 56px;
}

.nav-bar .nav-button .active.icon {
  border-radius: 10px;
  color: blue;
}

.nav-bar .nav-title {
  display: block;
  text-decoration: none;
  font-size: 12px;
}

@media (orientation: portrait) {
  .nav-bar {
    flex-direction: row;
    justify-content: space-around;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -10px 2px #548ab1;
  }

  .nav-bar > li > a {
    float: left;
  }
}

@media (orientation: landscape) {
  body {
    margin-left: 156px;
  }

  .nav-bar::before { content: "";}

  .nav-bar {
    flex-direction: column;
    align-items: flex-start;
    justify-content: normal;
    align-content: center;
    left: 0;
    width: 150px;
    height: 100%;
    box-shadow: 10px 0 2px #548ab1;
  }

  .nav-bar > li > a {
    float: top;
  }
}
</style>
