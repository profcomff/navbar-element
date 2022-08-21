<template>
  <div>
    <navbar-top />
    <navbar-bottom />
  </div>
</template>

<script>
import NavbarBottom from "@/components/Navbar";
import NavbarTop from "@/components/Appbar";

export default {
  components: {
    NavbarBottom,
    NavbarTop,
  },
};
</script>
