# Ugli-UI

CircleCI: [![CircleCI](https://circleci.com/gh/HUSTFE/Ugli-UI.svg?style=svg)](https://circleci.com/gh/HUSTFE/Ugli-UI)

> Ugli is a citrus fruit created by hybridizing a grapefruit, an orange, and a tangerine.

Ugli-UI is a mobile UI component Library.

## Start in development mode
```bash
yarn start
```

## Build for production

```bash
yarn build
```

You will get a production copy of Ugli-UI in `'./build'` directory.

### Tree shaking
To hug the webpack 4 and Parcel, we build this lib to an ES module in a single .js file.
So you may need a tree-shaking enabled bundler to bundle only the code you used.

### CSS
Currently, CSS was extracted as a single .css file, you need to `import` it yourself in your project
and configure correct loader or plugin to bundle them.
Or you just need to include them with `link` in HTML `head` tag.
In the future we may extract .css file for corresponding component to minimize the cost of import.

## Still in development
Currently this project is still in its early time and cannot be used in production.
So there is no corresponding npm package available.

## Contribute
If you are interested in this project, feel free to send PRs.
