<template>
  <div></div>
</template>

<script>
import axios from "axios";
import debounce from "lodash-es/debounce";


export default {
  created() {
    // SUBSCRIBE TO `selection` EVENT
    document.addEventListener("selectionchange", this.onSelectionChange);
  },
  methods: {
    /** DEBOUNCED `selectionchange` EVENT HANDLER */
    onSelectionChange: debounce(function() {
      // GET SELECTION DATA
      const selection = document.getSelection();
      // const range = selection.getRangeAt(0);
      const words = selection.toString().trim().split(' ').join('+');

      this.getSynonyms(words)

      // const {left, right, top} = range.getBoundingClientRect()
      // console.warn({ selection, range, text });
    }, 300),
    /** */
    getSynonyms: function(words) {
      return axios.get(`https://api.datamuse.com/words?ml=${words}`).then(response => {

        console.warn("getSynonyms", response);
      })
    }
  },
  beforeDestroy() {
    // RELEASE RESOURCES
    document.removeEventListener("selectionchange", this.onSelectionChange);
  }
}
</script>

<style lang="scss" scoped>

</style>