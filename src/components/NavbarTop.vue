<template>
    <NavbarTopPlain
        v-if="layoutName == 'plain'"
        class="noselect topnavbar"
        :options="options"
    />
    <NavbarTopBack
        v-else-if="layoutName == 'back'"
        class="noselect topnavbar"
        :options="options"
    />
    <KeepAlive>
        <NavbarTopCalendar
            v-if="layoutName == 'calendar'"
            class="noselect topnavbar"
            :options="options"
        />
    </KeepAlive>
</template>

<script>
import NavbarTopBack from '@/components/NavbarTopBack.vue';
import NavbarTopPlain from '@/components/NavbarTopPlain.vue';
import NavbarTopCalendar from '@/components/NavbarTopCalendar.vue';

export default {
    components: {
        NavbarTopBack,
        NavbarTopPlain,
        NavbarTopCalendar,
    },
    data: () => ({
        layoutName: 'plain',
        options: {},
    }),
    beforeMount() {
        document.getElementsByTagName('body')[0].style.marginTop = '56px';
        document.addEventListener('change-header-layout', e => {
            this.layoutName = e.detail.layoutName;
            this.options = e.detail;
        });
    },
};
</script>

<style scoped>
.topnavbar {
    z-index: 100;
}
.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
  supported by Chrome, Edge, Opera and Firefox */
}
</style>
