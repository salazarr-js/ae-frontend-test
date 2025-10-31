# 💻 Agile Engine - `Middle Front End` test

Middle Front End technical test for [Agile Engine](https://agileengine.com/)

- [Demo](https://ae-frontend-test.vercel.app/)
- [Requirements](https://agileengine.bitbucket.io/fePTOwPmNoGsIUyg/)

![Alt text](/src/assets/screenshot.png?raw=true "App screenshot")

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

## Prerequisites
Before you begin, make sure your development environment includes Node.js, an npm package manager and the version control system GIT.

Node.js version `14.x` or higher

## Project setup
```
npm install

npm run serve # Compiles and hot-reloads for development
npm run build # Compiles and minifies for production
npm run lint # Lints and fixes files
```
