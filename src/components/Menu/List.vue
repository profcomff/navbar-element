<template>
  <div class="container">
    <h2>{{info.name}}</h2>
    <list-item v-for="b in info.items" :key="b.path" :info="b"></list-item>
  </div>
</template>

<script>
import ListItem from "@/components/Menu/ListItem.vue";

export default {
  name: "list-view",
  props: {
    info: Object,
  },
  components: {
    ListItem
  },
};
</script>

<style>
</style>
