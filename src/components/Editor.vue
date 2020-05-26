<template>
  <div class="editor-container" :class="{ 'is-focused': isFocused }">
    <div class="editor-toolbar">
      <button class="editor-button" title="Bold" 
        :class="{ 'active': styles.bold }"
        @click="applyFormat('bold')"
      ><i class="fas fa-bold"></i></button>

      <button class="editor-button" title="Italic" 
        :class="{ 'active': styles.italic }"
        @click="applyFormat('italic')"
      ><i class="fas fa-italic"></i></button>

      <button class="editor-button" title="Underline" 
        :class="{ 'active': styles.underline }"
        @click="applyFormat('underline')"
      ><i class="fas fa-underline"></i></button>

      <div class="separator"></div>

      <button class="editor-button" title="Outdent" @click="applyFormat('outdent')"><i class="fas fa-outdent"></i></button>
      <button class="editor-button" title="Indent" @click="applyFormat('indent')"><i class="fas fa-indent"></i></button>
    </div>

    <div class="editor" contenteditable="true" spellcheck="false"
      @focus="onFocus()"
      @blur="onBlur()"
      v-html="html"
    ></div>
  </div>
</template>

<script>
import getMockText from '@/services/text.service';
import debounce from 'lodash-es/debounce';

export default {
  /** */
  data: function() {
    return {
      html: null,
      isFocused: false,
      selection: null,
      styles: {
        bold: false,
        italic: false,
        underline: false
      }
    }
  },
  /** INITIAL `created` HOOK */
  created() {
    // GET MOCK DATA
    getMockText().then(html => this.html = html );
    // SUBSCRIBE TO `selection` EVENT
    document.addEventListener('selectionchange', this.onSelectionChange);
  },
  /** */
  methods: {
    /** `focus` EVENT HANDLER */
    onFocus: function() { this.isFocused = true; },
    /** `blur` EVENT HANDLER */
    onBlur: function() { this.isFocused = false; },
    /** APPPLY FORMAT TO SELECTED TEXT */
    applyFormat: function(name, value = null) {
      document.execCommand(name, false, value);
    },
    /** DEBOUNCED `selectionchange` EVENT HANDLER */
    onSelectionChange: debounce(function() {
      // MAP `styles` AND VERIFY IF HAS ACTIVE STATE
      Object.keys(this.styles).forEach(key => {
        this.styles[key] = document.queryCommandState(key);
      });

      // IF SELECTION HAS 1 WORD
      console.warn('SELECTION CHANGE: ', document.getSelection() );
    }, 300),
  },
  /** RELEASE  */
  beforeDestroy() {
    document.removeEventListener('selectionchange', this.onSelectionChange);
  }
}
</script>

<style lang="scss" scoped>
  .editor-container {
    margin           : 16px auto;
    height           : 480px;
    display          : flex;
    position         : relative;
    overflow         : hidden;
    max-width        : 520px;
    transition       : all .3s ease-in-out;
    box-shadow       : 2px 2px 8px rgba($grey-dark, .08);
    border-radius    : 4px;
    flex-direction   : column;
    background-color : $white;
    &.is-focused { box-shadow : 4px 4px 12px rgba($grey-dark, .16); }

    .editor-toolbar {
      padding     : 4px 16px;
      display     : flex;
      position    : relative;
      box-shadow  : 0px 8px 16px white;
      align-items : center;

      &:before, &:after {
        top      : 0;
        left     : 0;
        right    : 0;
        bottom   : 0;
        content  : '';
        z-index  : 0;
        position : absolute;
      }
      &:before {
        box-shadow       : 2px 2px 8px rgba($grey-dark, .12);
        border-radius    : 50%;
        background-color : $grey;
      }
      &:after { background-color : $white; }

      .editor-button {
        width         : 32px;
        border        : none;
        cursor        : pointer;
        height        : 32px;
        display       : inline-block;
        outline       : none;
        z-index       : 1;
        padding       : 0;
        position      : relative;
        overflow      : hidden;
        position      : relative;
        background    : none;
        user-select   : none;
        margin-right  : 2px;
        border-radius : 4px;

        &:last-child { margin-right: 0; }
        &:active, &.active, &:hover { 
          &:before {
            opacity   : 1;
            transform : scale3d(1, 1, 1);
          }
        }
        &:active, &.active {
          > *  { color : $grey-dark; }
          &:before { background-color : $grey-lightest; }
        }
        &:hover:before { background-color : $white-ter; }
        &:before {
          top              : 0;
          left             : 0;
          right            : 0;
          bottom           : 0;
          z-index          : 0;
          content          : '';
          opacity          : 0;
          position         : absolute;
          transform        : scale3d(.5, .5, 1);
          transition       : all .15s ease-in-out;
          background-color : transparent;
        }

        > * {
          color     : $grey;
          position  : relative;
          font-size : 16px;
        }
      }
      
      .separator {
        width            : 1px;
        height           : 20px;
        z-index          : 1;
        position         : relative;
        margin-left      : 6px;
        margin-right     : 8px;
        background-color : $grey-lighter;
      }
    }

    .editor {
      flex        : 1;
      color       : $grey-dark;
      padding     : 16px 16px 8px;
      overflow    : auto;
      font-size   : 16px;
      line-height : 1.35;

      &:focus { outline : none; }
    }
  }
</style>