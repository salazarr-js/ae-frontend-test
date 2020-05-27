<template>
  <div class="editor-container" :class="{ 'is-focused': isFocused }">
    <EditorToolbar />
    <EditorSynPanel />

    <div
      class="editor"
      contenteditable="true"
      spellcheck="false"
      @focus="onFocus()"
      @blur="onBlur()"
      v-html="html"
    ></div>
  </div>
</template>

<script>
import EditorToolbar from "@/components/EditorToolbar.vue";
import EditorSynPanel from "@/components/EditorSynPanel.vue";

import getMockText from "@/services/text.service";

export default {
  components: {
    EditorToolbar,
    EditorSynPanel
  },
  data: function() {
    return {
      html: null,
      isFocused: false
    };
  },
  created() {
    // GET/SET MOCK DATA
    getMockText().then(html => (this.html = html));
  },
  methods: {
    /** `focus` EVENT HANDLER */
    onFocus: function() {
      this.isFocused = true;
    },
    /** `blur` EVENT HANDLER */
    onBlur: function() {
      this.isFocused = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-container {
  margin: 16px auto;
  height: 480px;
  display: flex;
  position: relative;
  // overflow: hidden;
  max-width: 520px;
  transition: all 0.3s ease-in-out;
  box-shadow: 2px 2px 8px rgba($grey-dark, 0.08);
  border-radius: 4px;
  flex-direction: column;
  background-color: $white;
  &.is-focused {
    box-shadow: 4px 4px 12px rgba($grey-dark, 0.16);
  }

  .editor {
    flex: 1;
    color: $grey-dark;
    padding: 16px 16px 8px;
    overflow: auto;
    font-size: 16px;
    line-height: 1.35;

    &:focus {
      outline: none;
    }
  }
}
</style>
