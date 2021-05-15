import env from './src/main/config/env'
import { langs } from './src/presentation/config/i18n'
import { resolve } from 'path'

export default {
    mode: "spa",
    srcDir: 'src/presentation/',
    head: {
        title: 'vueeter',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    css: [
        'vuesax/dist/vuesax.css',
        'assets/css/global.css'
    ],
    plugins: [
        '@/plugins/vuesax'
    ],
    components: true,
    buildModules: [
        '@nuxtjs/composition-api/module',
        '@nuxt/typescript-build',
        '@nuxtjs/stylelint-module',
        '@nuxtjs/tailwindcss',
        [
            'nuxt-i18n',
            {
                defaultLocale: 'en',
                locales: [
                    {
                        code: 'en',
                        name: 'English'
                    },
                    {
                        code: 'pt',
                        name: 'Português'
                    }
                ],
                vueI18n: langs
              }
        ]
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa'
    ],
    axios: {
        baseURL: env.API_URL
    },
    pwa: {
        manifest: {
            lang: 'en'
        }
    },
    alias: {
        '@': resolve(__dirname, './src'),
        '~app':  resolve(__dirname, './src/presentation'),
        '~assets': `<srcDir>/assets`,
        '~static': `<srcDir>/static`,
    },
    build: {
    },
    router: {
        middleware: ['auth']
    }
}
