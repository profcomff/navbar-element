<template>
  <div>
    <a :href="info.path">
      <span class="material-symbols-sharp">{{ info.icon }}</span>
      {{ info.text }}
    </a>
  </div>
</template>

<script>
export default {
  name: "list-item",
  props: {
    info: Object,
  },
};
</script>

<style>
</style>
