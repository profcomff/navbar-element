<template>
    <a :href="info.path" target="_blank">
      <img :src="info.icon.src" alt="info.text" />
      {{ info.text }}
    </a>
</template>

<script>
export default {
  name: "grid-item",
  props: {
    info: Object,
  },
};
</script>

<style scoped>
  a{
    align-self: flex-start;
    flex-grow: 1;
    flex-shrink: 1;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    text-decoration: none;
    font-size: 0.9em;
    font-weight: 600;
    padding: 1vmin;
    color: black;
    width: 25vmin;
    height: max-content;
    gap:2px;


  }
  img{
    border: 1px solid gray;
    border-radius: 25%;
    box-shadow: 1px 1px lightgray;
    padding: 2.5vmin;
    width: 20vmin;
  }
</style>
