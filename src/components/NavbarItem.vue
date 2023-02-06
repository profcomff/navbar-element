<template>
    <button
        class="navbar-item"
        :class="{ active }"
    >
        <i
            class="material-symbols-sharp tab--icon"
            aria-hidden="true"
        >
            {{ icon }}
        </i>
        <span class="navbar-title">
            {{ title }}
        </span>
    </button>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<style scoped>
.navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--bs-on-primary);
    flex: 1;
    border-bottom: 2px solid transparent;
}

.active {
    border-bottom: 2px solid var(--bs-secondary);
    color: var(--bs-secondary);
}

.navbar-title {
    font-size: 14px;
}
</style>
