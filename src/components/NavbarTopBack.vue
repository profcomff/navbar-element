<template>
  <header>
    <options-button icon="arrow_back" @click="back" />
    <div>{{ options.text }}</div>
    <dropdown-menu
      v-bind:menu="options.menu"
      v-if="options.menu && options.menu.length > 0"
    />
  </header>
</template>

<script>
import optionsButton from "@/components/OptionsButton";
import dropdownMenu from "@/components/DropdownMenu";
export default {
  components: { dropdownMenu, optionsButton },
  data: () => ({}),
  props: {
    options: { type: Object, default: () => ({ text: "Твой физфак!" }) },
  },
  methods: {
    back() { window.history.back() }
  }
};
</script>

<style scoped>
header {
  height: 56px;
  background-color: var(--bs-primary);
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

span,
div {
  color: #ffffff;
  margin-right: 16px;
}
</style>
