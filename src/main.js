import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const i18n = createI18n({
  locale: "ja",
  allowComposition: true, // you need to specify that!
  messages: {
    en: {
      hello: "hello!",
    },
    ja: {
      hello: "こんにちは！",
    },
  },
});
createApp(App).use(store).use(router).use(i18n).mount("#app");
