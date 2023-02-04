<template>
    <div>
        <NavbarMain
            :mobile="isMobile()"
            @navigate-url="
                (newPath, oldPath) => {
                    captureNavigation(oldPath, newPath);
                }
            "
        />
    </div>
</template>

<script>
import NavbarMain from './components/NavbarMain.vue';
import { Breakpoints } from './constants';
import { windowWidthMixin, captureNavigationMixin } from './mixins';

export default {
    components: { NavbarMain },
    mixins: [windowWidthMixin, captureNavigationMixin],

    data() {
        return { show_appbar: false };
    },

    methods: {
        isMobile() {
            return this.windowWidth < Breakpoints.SM;
        },
    },
};
</script>

<style>
span.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.7);
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
</style>
