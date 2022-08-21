<template>
  <div class="page-top-app-bar">
    <ui-top-app-bar
      :title="title"
      navIcon="false"
    >
      <template #toolbar="{ toolbarItemClass }">
        <ui-icon-button :class="toolbarItemClass" icon="more"></ui-icon-button>
      </template>
    </ui-top-app-bar>
  </div>
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

<style>
</style>
