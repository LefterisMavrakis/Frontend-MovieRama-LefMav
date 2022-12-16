const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/styles/variables.sass";
          @import "~@/styles/mixins.scss";
        `
      }
    }
  },
})
