// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "~/assets/style/style.css";
import Vuex from "vuex";
import store from "~/store.js";
import VueObserveVisibility from "vue-observe-visibility";
import VueDisqus from "vue-disqus";

export default function(Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  //Use Vuex store
  Vue.use(Vuex);
  appOptions.store = new Vuex.Store(store);

  //Use Intersection Observer
  Vue.use(VueObserveVisibility);

  head.title = "Auraq";
  head.titleTemplate = "";

  //Use vue-disqus
  Vue.use(VueDisqus, {
    shortname: "auraq",
  });

  // head.script.push({
  //   src: 'https://apis.google.com/js/platform.js?onload=initGapi',
  //   body: true
  // })

  head.link.push({
    rel: "preconnect",
    href: "https://fonts.gstatic.com/",
    crossorigin: true,
  });

  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=DM+Sans&family=DM+Serif+Display&family=DM+Serif+Text&family=Halant:wght@400&display=swap",
  });

  head.meta.push({
    name: "viewport",
    content:
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  });
}
