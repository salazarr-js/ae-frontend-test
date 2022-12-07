<template>
  <div id="app">
    <Header />
    <main>
      <div class="container">
        <Editor></Editor>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Editor from "./components/Editor";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Editor
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    padding: 32px 16px;
    background-color: $white-bis;
  }
}
</style>
