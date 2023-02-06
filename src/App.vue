<template>
    <div class="navbar-wrapper">
        <NavbarItem
            v-for="(item, i) in items"
            :key="item.title"
            v-bind="item"
            :active="active === i"
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
            active: items.reduce(
                (acc, cur, i) =>
                    window.location.pathname.startsWith(cur.path) ? i : acc,
                0,
            ),
        };
    },
    methods: {
        navigate(i) {
            this.active = i;
            document.dispatchEvent(
                new CustomEvent('change-page', {
                    detail: {
                        path: items[i].path,
                    },
                }),
            );
            singleSpa.navigateToUrl(items[i].path);
        },
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
