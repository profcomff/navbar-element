export const windowWidthMixin = {
    data() {
        return {
            windowWidth: 0,
        };
    },
    mounted() {
        this.windowWidth = window.innerWidth;
        window.addEventListener('resize', this.resizeHandler);
    },
    unmounted() {
        window.removeEventListener('resize', this.resizeHandler);
    },
    methods: {
        resizeHandler(event) {
            this.windowWidth = event.target.innerWidth;
        },
    },
};
