<template>
    <header>
        <div>{{ options.text }}</div>
        <DropdownMenu
            v-if="options.menu && options.menu.length > 0"
            :menu="options.menu"
        />
    </header>
</template>

<script>
import dropdownMenu from '@/components/DropdownMenu';
export default {
    components: { dropdownMenu },
    props: {
        options: { type: Object, default: () => ({ text: 'Твой физфак!' }) },
    },
    data: () => ({}),
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

div {
    color: #ffffff;
}
</style>
