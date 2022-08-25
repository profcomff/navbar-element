<template>
  <div class="container">
    <div class="category" v-for="category in buttons" :key="category.name">
      <grid-view v-if="(category.type == 'grid3')" :info="category" />
      <list-view v-else-if="(category.type == 'list')" :info="category" />
    </div>
  </div>
</template>

<script>
import GridView from "@/components/Menu/Grid.vue";
import ListView from "@/components/Menu/List.vue";

export default {
  name: "app-menu",
  components: {
    GridView,
    ListView,
  },
  data() {
    return {
      buttons: [],
    }
  },
  async beforeMount() {
    try {
      try {
        let res = await fetch("https://navbar.api.profcomff.com/apps");
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
</style>
