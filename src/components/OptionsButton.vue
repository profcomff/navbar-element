<template>
    <button
        class="material-symbols-sharp"
        :disabled="disabled"
        @click="createRipple"
    >
        {{ icon }}
    </button>
</template>

<script>
import createRipple from '@/events/ripple';
export default {
    props: {
        icon: {
            type: String,
            default: '',
        },
        disabled: Boolean,
    },
    methods: {
        createRipple: event => createRipple(event),
    },
};
</script>

<style scoped>
button {
    align-content: center;
    background: none;
    border: none;
    box-shadow: none;
    height: 100%;
    justify-content: center;
    cursor: pointer;
    color: var(--bs-on-primary);
    border-radius: 50%;
}

button:disabled {
    color: var(--bs-on-primary);
    opacity: 0.6;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
