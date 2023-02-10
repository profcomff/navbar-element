<template>
    <div class="navbar-wrapper">
        <NavbarItem
            v-for="(item, i) in items"
            :key="item.title"
            v-bind="item"
            :active="pathname.startsWith(item.path)"
            @click="() => navigate(i)"
        />
    </div>
</template>
<script>
import NavbarItem from './components/NavbarItem.vue';
import * as singleSpa from 'single-spa';

const items = [
    { title: 'Расписание', icon: 'calendar_month', path: '/timetable' },
    { title: 'Сервисы', icon: 'apps', path: '/apps' },
];
export default {
    components: { NavbarItem },
    data() {
        return {
            items,
            pathname: window.location.pathname,
        };
    },
    methods: {
        navigate(i) {
            singleSpa.navigateToUrl(items[i].path);
        },
        beforeRoutingEventHandler() {
            this.pathname = window.location.pathname;
        },
    },
    mounted() {
        window.addEventListener(
            'single-spa:before-routing-event',
            this.beforeRoutingEventHandler,
        );
    },
    unmounted() {
        window.removeEventListener(
            'single-spa:before-routing-event',
            this.beforeRoutingEventHandler,
        );
    },
};
</script>
<style>
.navbar-wrapper {
    display: flex;
    background: var(--bs-primary);
    height: 56px;
}

@media screen and (min-width: 576px) {
    .navbar-wrapper {
        display: none;
    }
}
</style>
