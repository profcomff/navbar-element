<template>
  <div class="sidebar d-flex flex-column flex-shrink-0 p-3 bg-light">
    <a
      href="/"
      class="
        d-flex
        align-items-center
        mb-3 mb-md-0
        me-md-auto
        link-dark
        text-decoration-none
      "
    >
      <img class="header-img fs-4" src="/icon-512x512.png" />
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" v-for="(b, i) in buttons" :key="b.path">
        <div
          :aria-selected="i == active"
          :class="{ active: i == active }"
          :key="b.path"
          :tabindex="i"
          @click="$emit('navigate', i)"
          aria-current="page"
          class="nav-link"
        >
          <span class="bi me-2 material-symbols-sharp" width="16" height="16">
            {{ b.icon }}
          </span>
          {{ b.text }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navbar-side",
  props: ["buttons", "active"],
  async beforeMount() {
    document.getElementsByTagName("body")[0].style.marginLeft = "340px";
  },
};
</script>

<style scoped>
.sidebar {
  width: 340px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.header-img {
  margin: 0 auto;
  width: 60%;
}

/*! CSS Used from: https://getbootstrap.com/docs/5.0/examples/sidebars/sidebars.css */
.bi {
  vertical-align: -0.125em;
  pointer-events: none;
  fill: currentColor;
}
.dropdown-toggle {
  outline: 0;
}
</style>
