/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from '@/plugins/vuetify'
import router from "@/plugins/router";
import pinia from "@/plugins/pinia";

export function registerPlugins(app) {
  app.use(router)
  app.use(pinia)
  app.use(vuetify)
}
