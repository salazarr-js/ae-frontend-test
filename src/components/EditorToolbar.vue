<template>
  <div class="editor-toolbar">
    <button
      class="editor-button"
      title="Undo"
      @click="applyFormat('undo')"
    >
      <i class="fas fa-undo"></i>
    </button>
    <button
      class="editor-button"
      title="Redo"
      @click="applyFormat('Redo')"
    >
      <i class="fas fa-redo"></i>
    </button>

    <div class="separator"></div>

    <button
      class="editor-button"
      title="Bold"
      @click="applyFormat('bold')"
      :class="{ active: styles.bold }"
    >
      <i class="fas fa-bold"></i>
    </button>

    <button
      class="editor-button"
      title="Italic"
      @click="applyFormat('italic')"
      :class="{ active: styles.italic }"
    >
      <i class="fas fa-italic"></i>
    </button>

    <button
      class="editor-button"
      title="Underline"
      @click="applyFormat('underline')"
      :class="{ active: styles.underline }"
    >
      <i class="fas fa-underline"></i>
    </button>

    <div class="separator"></div>

    <button
      class="editor-button"
      title="Outdent"
    >
      <i class="fas fa-outdent"></i>
    </button>
    <button
      class="editor-button"
      title="Indent"
    >
      <i class="fas fa-indent"></i>
    </button>

    <div class="separator"></div>
  </div>
</template>

<script>
import debounce from "lodash-es/debounce";

export default {
 data: function() {
   return {
      styles: {
        bold: false,
        italic: false,
        underline: false
      }
    }
  },
  created() {
    // SUBSCRIBE TO `selection` EVENT
    document.addEventListener("selectionchange", this.onSelectionChange);
  },
  methods: {
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
    }, 200)
  },
  /** RELEASE RESOURCES */
  beforeDestroy() {
    document.removeEventListener("selectionchange", this.onSelectionChange);
  }
}
</script>

<style lang="scss" scoped>
.editor-toolbar {
  padding: 4px 16px;
  display: flex;
  position: relative;
  box-shadow: 0px 8px 16px white;
  align-items: center;

  &:before,
  &:after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    z-index: 0;
    position: absolute;
  }
  &:before {
    box-shadow: 2px 2px 4px rgba($grey-dark, 0.12);
    border-radius: 25%;
  }
  &:after {
    background-color: $white;
  }

  .editor-button {
    width: 32px;
    border: none;
    cursor: pointer;
    height: 32px;
    display: inline-block;
    outline: none;
    z-index: 1;
    padding: 0;
    position: relative;
    overflow: hidden;
    position: relative;
    background: none;
    user-select: none;
    margin-right: 2px;
    border-radius: 4px;

    &:last-child {
      margin-right: 0;
    }
    &:active,
    &.active,
    &:hover {
      &:before {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    }
    &:active,
    &.active {
      > * {
        color: $grey-dark;
      }
      &:before {
        background-color: $grey-lightest;
      }
    }
    &:hover:before {
      background-color: $white-ter;
    }
    &:before {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      content: "";
      opacity: 0;
      position: absolute;
      transform: scale3d(0.5, 0.5, 1);
      transition: all 0.15s ease-in-out;
      background-color: transparent;
    }

    > * {
      color: $grey;
      position: relative;
      font-size: 16px;
    }
  }

  .separator {
    width: 1px;
    height: 20px;
    z-index: 1;
    position: relative;
    margin-left: 6px;
    margin-right: 8px;
    background-color: $grey-lighter;
  }
}
</style>