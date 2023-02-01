<template>
    <div class="sidebar d-flex flex-column flex-shrink-0 p-3 bg-light">
        <a
            href="/"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
            <img
                class="header-img fs-4"
                :src="logoItem"
            />
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
            <li
                v-for="(b, i) in buttons"
                :key="b.path"
                class="nav-item"
            >
                <div
                    :key="b.path"
                    :aria-selected="i == active"
                    :class="{ active: i == active }"
                    :tabindex="i"
                    aria-current="page"
                    class="nav-link noselect"
                    @click="$emit('navigate', i)"
                >
                    <span
                        class="bi me-2 material-symbols-sharp"
                        width="16"
                        height="16"
                    >
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
    name: 'NavbarSide',
    props: ['buttons', 'active'],
    emits: ['navigate'],
    computed: {
        logoItem() {
            return `${process.env.VUE_APP_CDN}/app/logo/logo_ff.svg`;
        },
    },
    async beforeMount() {
        document.getElementsByTagName('body')[0].style.marginLeft = '340px';
    },
};
</script>

<style scoped>
.noselect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Old versions of Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    cursor: pointer;
}

.sidebar {
    width: 340px;
    position: fixed;
    left: 0;
    top: 56px;
    bottom: 0;
    z-index: -1;
}

.header-img {
    margin: 0 auto;
    width: 60%;
}

.bi {
    vertical-align: -0.125em;
    pointer-events: none;
    fill: currentColor;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
    background-color: var(--bs-primary);
    color: var(--bs-on-primary);
}

.nav-link,
.nav-link:hover {
    color: var(--bs-primary);
}

.nav-link:hover {
    border-radius: var(--bs-nav-pills-border-radius);
    opacity: 0.6;
}

.dropdown-toggle {
    outline: 0;
}
</style>
