<template>
  <div class="editor-toolbar">
    <el-tooltip placement="top" content="Undo" visible-arrow="false">
      <button class="editor-button" @click="applyFormat('undo')">
        <i class="fas fa-undo"></i>
      </button>
    </el-tooltip>
    <el-tooltip placement="top" content="Redo">
      <button class="editor-button" @click="applyFormat('redo')">
        <i class="fas fa-redo"></i>
      </button>
    </el-tooltip>

    <div class="separator"></div>

    <el-tooltip placement="top" content="Bold">
      <button
        class="editor-button"
        @click="applyFormat('bold')"
        :class="{ active: styles.bold }"
      >
        <i class="fas fa-bold"></i>
      </button>
    </el-tooltip>

    <el-tooltip placement="top" content="Italic">
      <button
        class="editor-button"
        @click="applyFormat('italic')"
        :class="{ active: styles.italic }"
      >
        <i class="fas fa-italic"></i>
      </button>
    </el-tooltip>

    <el-tooltip placement="top" content="Underline">
      <button
        class="editor-button"
        @click="applyFormat('underline')"
        :class="{ active: styles.underline }"
      >
        <i class="fas fa-underline"></i>
      </button>
    </el-tooltip>

    <input
      id="color-picker"
      type="color"
      style="display: none;"
      @input="onColorChange($event)"
    />
    <el-tooltip placement="top" content="Font Color">
      <label for="color-picker" class="editor-button">
        <i class="fas fa-font"></i>
      </label>
    </el-tooltip>
    <div class="separator"></div>

    <el-tooltip placement="top" content="Justify Left">
      <button
        class="editor-button"
        @click="applyFormat('justifyLeft')"
        :class="{ active: styles.justifyLeft }"
      >
        <i class="fas fa-align-left"></i>
      </button>
    </el-tooltip>

    <el-tooltip placement="top" content="Justify Center">
      <button
        class="editor-button"
        @click="applyFormat('justifyCenter')"
        :class="{ active: styles.justifyCenter }"
      >
        <i class="fas fa-align-center"></i>
      </button>
    </el-tooltip>

    <el-tooltip placement="top" content="Justify Right">
      <button
        class="editor-button"
        @click="applyFormat('justifyRight')"
        :class="{ active: styles.justifyRight }"
      >
        <i class="fas fa-align-right"></i>
      </button>
    </el-tooltip>

    <div class="separator"></div>

    <el-tooltip placement="top" content="Outdent">
      <button class="editor-button" @click="applyFormat('outdent')">
        <i class="fas fa-outdent"></i>
      </button>
    </el-tooltip>

    <el-tooltip placement="top" content="Indent">
      <button class="editor-button" @click="applyFormat('indent')">
        <i class="fas fa-indent"></i>
      </button>
    </el-tooltip>

    <div class="separator"></div>

    <el-tooltip placement="top" content="Remove Format">
      <button class="editor-button" @click="applyFormat('removeFormat')">
        <i class="fas fa-remove-format"></i>
      </button>
    </el-tooltip>
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
        underline: false,
        justifyLeft: false,
        justifyCenter: false,
        justifyRight: false
      }
    };
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
    }, 200),
    /** */
    onColorChange: function(event) {
      this.applyFormat("foreColor", event.target.value);
    }
  },
  /** RELEASE RESOURCES */
  beforeDestroy() {
    document.removeEventListener("selectionchange", this.onSelectionChange);
  }
};
</script>

<style lang="scss" scoped>
.editor-toolbar {
  padding: 4px 16px;
  display: flex;
  position: relative;
  flex-wrap: wrap;
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
    left: 4px;
    right: 4px;
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
    display: inline-flex;
    outline: none;
    z-index: 1;
    padding: 0;
    position: relative;
    overflow: hidden;
    position: relative;
    background: none;
    align-items: center;
    user-select: none;
    margin-right: 2px;
    border-radius: 4px;
    justify-content: center;

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
