<template>
  <div
    class="container"
    v-bind:style="{ paddingBottom: mobile ? '56px' : '0px' }"
  >
    <div class="category" v-for="category in buttons" :key="category.name">
      <grid-view v-if="category.type == 'grid3'" :info="category" />
      <list-view v-else-if="category.type == 'list'" :info="category" />
    </div>
    <img :src="kitten" />
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
    };
  },
  props: {
    mobile: Boolean,
  },
  async beforeMount() {
    try {
      try {
        let res = await fetch(`${process.env.VUE_APP_API_NAVBAR}/apps`);
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
  computed: {
    kitten() {
      return `${process.env.VUE_APP_CDN}/app/menu_icons/kitty.svg`;
    },
  },
  methods: {},
};
</script>

<style scoped>
.container {
  padding: 66px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
}
img {
  align-self: flex-end;
  width: 3em;
}
</style>
