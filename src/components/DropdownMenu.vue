<template>
  <options-button
    icon="more_vert"
    @click="showOptions = !showOptions"
    :disabled="disabled"
  />
  <div v-if="showOptions" class="dropdown-menu" v-click-outside="closeMenu">
    <button
      class="dropdown-item"
      v-for="(menuItem, index) in menu"
      :key="index"
      @click="emitMenuAction(index)"
    >
      {{ menuItem.name }}
    </button>
  </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
import optionsButton from "@/components/OptionsButton";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: { optionsButton },
  data: () => ({
    showOptions: false,
  }),
  props: {
    menu: { type: Array, default: () => [] },
    disabled: Boolean,
  },
  methods: {
    openMenu() {
      console.log(this.menu);
      this.showOptions = !this.showOptions;
    },
    closeMenu() {
      this.showOptions = false;
    },
    emitMenuAction(i) {
      this.closeMenu();
      this.menu[i].action();
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  display: block;
  position: absolute;
  max-width: 300px;
  top: 50px;
  right: 10px;
  z-index: 1;
}
</style>
