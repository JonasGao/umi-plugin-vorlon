# umi-plugin-vorlon

[![NPM version](https://img.shields.io/npm/v/umi-plugin-vorlon.svg?style=flat)](https://npmjs.org/package/umi-plugin-vorlon)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-vorlon.svg?style=flat)](https://npmjs.org/package/umi-plugin-vorlon)

inject vorlonjs to html head

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-vorlon', options],
  ],
}
```

## Options

- enabled ``boolean``
  是否启用插件
  默认 `true`
- schema ``boolean|"http"|"https"``
  脚本 src 的 url schema
  默认 `'http'`
- host ``boolean|string``
  脚本 src 的 url host
  默认 `'127.0.0.1'`
- port ``boolean|string|number``
  脚本 src 的 url port
  默认 `'1337'`

## LICENSE

MIT
