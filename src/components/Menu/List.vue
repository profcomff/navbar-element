<template>
  <div>
    <h2>{{ info.name }}</h2>
    <div class="services">
      <list-item
        v-for="b in info.items"
        :key="b.path"
        :info="b"
        @click.capture="$emit('navigate', b.path)"
      ></list-item>
    </div>
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
    ListItem,
  },
};
</script>

<style scoped>
.services {
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
  gap: 0.8em;
  padding: 10px;
}
</style>
