import vuetify from '@/plugins/vuetify'
import router from "@/plugins/router";
import pinia from "@/plugins/pinia";

export function registerPlugins(app) {
  app.use(pinia)
  app.use(router)
  app.use(vuetify)
}
