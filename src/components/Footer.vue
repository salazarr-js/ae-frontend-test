<template>
  <footer>
    <div class="container">
      <a class="footer-link" href="https://agileengine.bitbucket.io/fePTOwPmNoGsIUyg/">
        <h2>Jose Salazar</h2>
        <p>2020 © AgileEngine, LLC</p>
      </a>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  footer {
    padding          : 16px 0;
    text-align       : center;
    background-color : $grey-dark;
    .footer-link {
      color      : $grey-lightest;
      display    : inline-block;
      transition : all .15s ease-in-out;
      &:hover { color: $white; }
      h2, p { line-height: 1.35; }
      h2 {
        font-weight: bold;
        font-size: 16px;
      }
      p {
        font-weight: normal;
        font-size: 12px;
      }
    }
  }
</style>