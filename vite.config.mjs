// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// Utilities
import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'

export default defineConfig({
    plugins: [
        Vue({
            template: {transformAssetUrls}
        }),
        vueDevTools(),
        Vuetify(),
        Components(),
        ViteFonts({
            google: {
                families: [{
                    name: 'Roboto',
                    styles: 'wght@100;300;400;500;700;900',
                }],
            },
        }),
    ],
    define: {'process.env': {}},
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    },
    server: {
        port: 3000,
       host: '0.0.0.0',
    },
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern-compiler',
            },
        },
    },
})
