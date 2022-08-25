<template>
  <div class="container">
    <h2>{{info.name}}</h2>
    <grid-item v-for="b in info.items" :key="b.path" :info="b"></grid-item>
  </div>
</template>

<script>
import GridItem from "@/components/Menu/GridItem.vue";

export default {
  name: "grid-view",
  props: {
    info: Object,
  },
  components: {
    GridItem,
  },
};
</script>

<style>
</style>
