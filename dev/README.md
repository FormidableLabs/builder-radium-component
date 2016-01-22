[![Travis Status][trav_img]][trav_site]

Builder Archetype: React Component
==================================

A React component archetype for [builder][].

## Installation

To use the production and development workflows, install both this package
and the development module:

```sh
$ npm install --save builder-radium-component
$ npm install --save-dev builder-radium-component-dev
```

## Generator

> **NOTE**: `builder-init` support is **not yet implemented**.
> https://github.com/FormidableLabs/builder-init/issues/2

To bootstrap a new project from scratch with template files from this
archetype, you can use [builder-init][]:

```sh
$ npm install -g builder-init
$ builder-init builder-radium-component
```

This will download this archetype, prompt you for several template data values
and inflate the [archetype templates](./init) to real files at a chosen
directory.

## Project Structure

See the [development][] guide for workflows associated with this archetype.

The archetype assumes a file structure like the following:

```
demo/
  app.jsx
  index.html
src
  components/
    *.jsx
  index.js
test
  client/
    spec/
      components/
        *.jsx?
      *.jsx?
    main.js
    test.html
.builderrc
package.json
```

This matches the [`builder-init` templates](init) found in the source of this
archetype.

### File / Component Name

The `name` field in `package.json` (the published `npm` package name) is
assumed to be:

1. The desired file name of the distribution files and dash-cased.
2. The desired default exported class name when converted to PascalCase.

So, if a `package.json` has:

```js
{
  "name": "my-cool-component"
}
```

The distribution files to output are:

```
dist/my-cool-component.js
dist/my-cool-component.js.map
dist/my-cool-component.min.js
dist/my-cool-component.min.js.map
```

and the exported class name is `MyCoolComponent`.

## Usage Notes

This archetype does not currently specify its own `.babelrc`. Your project
should specify its own in the root directory if you want non-default Babel
settings (like using stage 0, for instance). See [the recommended
settings](config/babel/.babelrc).

## Tasks

```
$ builder help builder-radium-component

Usage:

  builder <action> <task(s)>

Actions:

  help, run, concurrent, envs

Flags: General

  --builderrc: Path to builder config file (default: `.builderrc`)

Tasks:

  npm:postinstall
    [builder-radium-component] cd lib || builder run build-lib

  npm:preversion
    [builder-radium-component] builder run check

  npm:test
    [builder-radium-component] builder run test-frontend

  npm:version
    [builder-radium-component] builder run clean && builder run build && git add -A dist

  build
    [builder-radium-component] builder run build-lib && builder run build-dist

  build-dist
    [builder-radium-component] builder run clean-dist && builder run build-dist-min && builder run build-dist-dev

  build-dist-dev
    [builder-radium-component] webpack --config node_modules/builder-radium-component/config/webpack/webpack.config.dev.js --colors

  build-dist-min
    [builder-radium-component] webpack --config node_modules/builder-radium-component/config/webpack/webpack.config.babel.js --colors

  build-lib
    [builder-radium-component] builder run clean-lib && babel src -d lib --copy-files

  check
    [builder-radium-component] builder run lint && builder run test

  check-ci
    [builder-radium-component] builder run lint && builder run test-ci

  check-cov
    [builder-radium-component] builder run lint && builder run test-cov

  check-dev
    [builder-radium-component] builder run lint && builder run test-dev

  clean
    [builder-radium-component] builder run clean-lib && builder run clean-dist

  clean-dist
    [builder-radium-component] rimraf dist

  clean-lib
    [builder-radium-component] rimraf lib

  dev
    [builder-radium-component] builder concurrent server-dev server-test

  hot
    [builder-radium-component] builder concurrent server-hot server-test

  lint
    [builder-radium-component] builder concurrent lint-server lint-client lint-client-test

  lint-client
    [builder-radium-component] eslint --color --ext .js,.jsx -c node_modules/builder-radium-component/config/eslint/.eslintrc-client src demo/*.jsx

  lint-client-test
    [builder-radium-component] eslint --color --ext .js,.jsx -c node_modules/builder-radium-component/config/eslint/.eslintrc-client-test src test/client

  lint-server
    [builder-radium-component] eslint --color -c node_modules/builder-radium-component/config/eslint/.eslintrc-server *.js

  open-demo
    [builder-radium-component] opener http://127.0.0.1:3000

  open-dev
    [builder-radium-component] builder concurrent dev open-demo

  open-hot
    [builder-radium-component] builder concurrent hot open-demo

  server-dev
    [builder-radium-component] webpack-dev-server --port 3000 --config node_modules/builder-radium-component/config/webpack/demo/webpack.config.dev.js --colors --content-base demo

  server-hot
    [builder-radium-component] webpack-dev-server --port 3000 --config node_modules/builder-radium-component/config/webpack/demo/webpack.config.hot.js --colors --hot --content-base demo

  server-test
    [builder-radium-component] webpack-dev-server --port 3001 --config node_modules/builder-radium-component/config/webpack/webpack.config.test.js --colors

  test
    [builder-radium-component] builder run npm:test

  test-ci
    [builder-radium-component] builder run test-frontend-ci

  test-cov
    [builder-radium-component] builder run test-frontend-cov

  test-dev
    [builder-radium-component] builder run test-frontend-dev

  test-frontend
    [builder-radium-component] karma start node_modules/builder-radium-component/config/karma/karma.conf.js

  test-frontend-ci
    [builder-radium-component] karma start --browsers PhantomJS,Firefox node_modules/builder-radium-component/config/karma/karma.conf.coverage.js

  test-frontend-cov
    [builder-radium-component] karma start node_modules/builder-radium-component/config/karma/karma.conf.coverage.js

  test-frontend-dev
    [builder-radium-component] karma start node_modules/builder-radium-component/config/karma/karma.conf.dev.js
```

[builder]: https://github.com/FormidableLabs/builder
[builder-init]: https://github.com/FormidableLabs/builder-init
[development]: ./DEVELOPMENT.md
[trav_img]: https://api.travis-ci.org/FormidableLabs/builder-radium-component.svg
[trav_site]: https://travis-ci.org/FormidableLabs/builder-radium-component
