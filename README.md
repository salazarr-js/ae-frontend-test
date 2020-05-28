# Advanced Text Editor

[![Netlify Status](https://api.netlify.com/api/v1/badges/af9bf802-302a-443a-81a3-9feaffa8299d/deploy-status)](https://app.netlify.com/sites/vue-text-editor/deploys)

`Front-end Software Developer` test project to apply in Agile Engine

- [Demo](https://vue-text-editor.netlify.app/)
- [Requirements](https://agileengine.bitbucket.io/fePTOwPmNoGsIUyg/)


## Considerations

There are already several very good rich text editors on the market, fully customizable and extendable by plugins, some of them even are supported by `vue` as is shown in this [Medium post](https://medium.com/mounoydev/vue-component-rich-text-editor-wysiwyg-59b57052d5b3), and in this [repo](https://github.com/dok/awesome-text-editing).

Some of the most recommendable for `vue` use are [Tiptap](https://tiptap.scrumpy.io/) and [Prosemirror Toolkit](https://prosemirror.net/).

By consideration of this test, the entire text editor is built from scratch using the `execCommand` API on `contenteditable` element, which is experimental and not recommended for production projects

## Features

1. Custom text editor for manipulation and formatting
1. Interaction with words by double-click or range selection
1. Basic formatting `Bold`, `Italic`, and `Underline`
1. Persistent formatting settings
1. Synonyms by words
1. Word replacement with selected synonyms
1. Flexible and extendable by new formatting actions

### Extra Features 

- [x] Last `vue` stable version
- [x] [Element UI](https://element.eleme.io) components
- [x] Custom Styles using [Bulma](https://bulma.io/)
- [x] Responsive design
- [x] Extra formatting actions `Font Color`, `Justify left`, `Justify center`, `Justify right`, `Indent`,`Outdent`, `Remove format`


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
