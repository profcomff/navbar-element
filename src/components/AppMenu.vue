<template>
  <div v-if="!this.loaded" class='timetable'>
    <div class="lds-dual-ring"></div>
  </div>
  <div v-else
    class="container"
    v-bind:style="{ paddingBottom: mobile ? '56px' : '0px' }"
  >
    <div class="category" v-for="category in buttons" :key="category.name">
      <grid-view
        v-if="category.type == 'grid3'"
        :info="category"
        @navigate="route"
      />
      <list-view
        v-else-if="category.type == 'list'"
        :info="category"
        @navigate="route"
      />
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
      loaded: false,
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
      } catch (err) {
        this.buttons = JSON.parse(localStorage.getItem("navbar-buttons"));
      }
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.setItem("navbar-buttons", JSON.stringify(this.buttons));
    }
    this.loaded = true;
  },
  computed: {
    kitten() {
      return `${process.env.VUE_APP_CDN}/app/menu_icons/kitty.svg`;
    },
  },
  methods: {
    route(to) {
      this.$emit("route", window.location.pathname, to);
    },
  },
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
.timetable {
  padding: 10px;
  padding-top: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 56px);
  width: auto;
}
img {
  align-self: flex-end;
  width: 3em;
}
</style>
