<template>
  <ul role="navigation" class="navbar">
    <li><a @click="navigate('/timetable')">Расписание</a></li>
    <li><a @click="navigate('/about')">Информация</a></li>
    <li><a @click="navigate('/settings')">Настройки</a></li>
  </ul>
</template>

<script>
import * as singleSpa from "single-spa";

export default {
  name: "navbar",
  methods: {
    navigate(addr) {
      singleSpa.navigateToUrl(addr);
    },
  },
};
</script>

<style>
.navbar {
  background-color: #fff;
  overflow: hidden;
  position: fixed;
  padding: 0;
  margin: 0;
}

.navbar > li {
  list-style-type: none;
  padding: 0;
}

.navbar > li > a {
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 12px;
}

.navbar li:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.navbar a.active {
  background-color: #04aa6d;
  color: white;
}

@media (orientation: portrait) {
  .navbar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -10px 7px #f2f2f2;
  }

  .navbar > li > a {
    float: left;
  }
}

@media (orientation: landscape) {
  body {
    margin-left: 200px;
  }

  .navbar {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: normal;
    left: 0;
    width: 150px;
    height: 100%;
    box-shadow: 10px 0 7px #f2f2f2;
  }

  .navbar > li > a {
    float: top;
  }
}
</style>
