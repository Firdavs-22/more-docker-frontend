/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from '@/plugins/vuetify'
import router from "@/plugins/router";

export function registerPlugins (app) {
  app.use(router)
  app.use(vuetify)
}
