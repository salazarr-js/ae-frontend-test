
/** */
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/scss/_variables.scss";`
      }
    }
  }
};