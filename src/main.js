import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';
import BalmUINext from 'balm-ui-next';
import 'balm-ui-css';

import App from './App.vue';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {});
    },
  },
  handleInstance(app) {
    app.use(BalmUI);
    app.use(BalmUIPlus);
    app.use(BalmUINext, {});
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
