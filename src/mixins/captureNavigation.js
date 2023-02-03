export const captureNavigationMixin = {
    methods: {
        async captureNavigation(from, to) {
            if (from === to) return;
            try {
                fetch(`${process.env.VUE_APP_API_MARKETING}/action`, {
                    method: 'POST',
                    cache: 'no-cache',
                    redirect: 'follow',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: localStorage.getItem('marketing-id'),
                        action: 'route to',
                        path_from: from,
                        path_to: to,
                    }),
                });
            } catch {
                //Failed, skips
            }
        },
    },
};
