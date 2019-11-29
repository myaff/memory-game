const path = require('path');
const webpack = require('webpack');

/*
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const extendRoutes = require('./routes/index');
*/
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
        base: '/memory-game/'
    }
} : {}

module.exports = {
    ...routerBase,
    /*
  ** Headers of the page
  */
    head: {
        title: 'Memory Game',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport',
                content: 'width=device-width, initial-scale=1' },
            { hid: 'description',
                name: 'description',
                content: 'Nuxt.js project' },
        ],
        link: [
            { rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
          'https://fonts.googleapis.com/css?family=Alegreya:400,400i,500,500i|Rubik:400,400i,500&display=swap',
            },
        ],
        script: [],
    },

    mode: 'spa',

    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/svg-sprite',
    ],

    styleResources: {
        stylus: [
            './assets/stylus/vars.styl',
            './assets/stylus/tools/mixins.styl'
        ]
    },

    svgSprite: {},

    loading: {
        color: '#f9b000',
        height: '2px',
    },

    // loadingIndicator: {
    //     color: '#f9b000',
    //     name: 'folding-cube',
    // },

    // loadingIndicator: '~/components/others/loading.html',

    /*
    ** Global CSS
    */
    css: [
        //'swiper/css/swiper.min.css',
        {
            src: '~assets/stylus/main.styl',
            lang: 'stylus'
        }
    ],

    plugins: [
        { src: '~plugins/svg4everybody.js', ssr: false },
        //'~plugins/components.js',
        //'~plugins/grid.js',
        //'~/plugins/device.js',
        //'~/plugins/click-outside.js',
    ],

    
};
