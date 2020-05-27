<template>
  <div class="dropdown synonyms-conteiner" :class="{ 'is-active': words.length }" :style="position">
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#"
          class="dropdown-item"
          v-for="word in words" :key="word"
          @click="selectSyn(word)"
        >{{ word }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash-es/debounce";

export default {
  data: function() {
    return {
      words: [],
      selection: null,
      position: {
        top: 0,
        left: 0
      }
    }
  },
  created() {
    // SUBSCRIBE TO `selection` EVENT
    document.addEventListener("selectionchange", this.onSelectionChange);
  },
  methods: {
    /** DEBOUNCED `selectionchange` EVENT HANDLER */
    onSelectionChange: debounce(function() {
      this.words = [];
      this.selection = document.getSelection();

      if ( this.selection.rangeCount ) {
        const { top, left, width } = this.selection.getRangeAt(0).getBoundingClientRect();

        this.position = { top: top+'px', left: `${left + (width/2)}px` };
      }

      const words = this.selection.toString().trim().split(' ');
      if ( words.length == 1 ) {
        this.getSynonyms(words);
      }
    }, 300),
    /** REQUEST TO `datamuse` API FOR SYNONYMS */
    getSynonyms: function(wordsArray) {
      return axios.get(`https://api.datamuse.com/words?ml=${wordsArray.join('+')}`).then(response => {
      // return axios.get(`https://api.datamuse.com/words?rel_syn=${wordsArray.join('+')}`).then(response => {
        this.words = response.data.slice(0, 10).map(syn => syn.word);
      })
    },
    /** */
    selectSyn: function(word) {
      const range = this.selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode( document.createTextNode(word) );
      
      this.selection.removeAllRanges();
      this.selection = null;
      this.words = []
    }
  },
  beforeDestroy() {
    // RELEASE RESOURCES
    document.removeEventListener("selectionchange", this.onSelectionChange);
  }
}
</script>

<style lang="scss" scoped>

.synonyms-conteiner {
  opacity: 0;
  z-index: 9999;
  position: fixed;
  transform: translateY(24px) translateX((190 / 2) * -1px);
  transition: opacity .2s ease-in-out;
  &.is-active {
    opacity: 1;
  }
  .dropdown-menu {
    .dropdown-content {
      overflow: auto;
      max-height: 180px;
    }
  }
}
</style>