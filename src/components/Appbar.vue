<template>
  <header>
    <span>Твой ФФ!</span>
  </header>
</template>

<script>
export default {
  name: "navbar-top",
  data() {
    return {
      title: "Твой физфак!",
    };
  },
};
</script>

<style scoped>
header {
  height: 56px;
  background-color: var(--bs-primary);
  color: var(--bs-on-primary);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  gap: 10px;
  padding: 10px 4%;
  box-shadow: 0px 2px 2px lightgray;
}
</style>
