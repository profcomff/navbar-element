<template>
  <div>
    <a :href="info.path">
      <img :src="info.icon.src" alt="info.text" />
      {{ info.text }}
    </a>
  </div>
</template>

<script>
export default {
  name: "grid-item",
  props: {
    info: Object,
  },
};
</script>

<style>
</style>
