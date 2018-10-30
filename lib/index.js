"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ref:
// - https://umijs.org/plugin/develop.html
const defaultOpt = {
  enabled: true,
  schema: 'http',
  host: '127.0.0.1',
  port: '1337'
};
const PREFIX = "VORLON_";
const K_ENABLED = `${PREFIX}ENABLED`;
const K_SCHEMA = `${PREFIX}SCHEMA`;
const K_HOST = `${PREFIX}HOST`;
const K_PORT = `${PREFIX}PORT`;

function mergeEnv(key, options) {
  let value = process.env[key];

  if (!value) {
    return;
  }

  switch (key) {
    case K_ENABLED:
      try {
        value = !!JSON.parse(value);
      } catch (ignored) {
        value = value === "true";
      }

      options.enabled = value;
      break;

    case K_SCHEMA:
      options.schema = value;
      break;

    case K_HOST:
      options.host = value;
      break;

    case K_PORT:
      options.port = value;
      break;
  }
}

function _default(api, options = defaultOpt) {
  if (options !== defaultOpt) {
    options = _objectSpread({}, defaultOpt, options);
  }

  mergeEnv(K_ENABLED, options);
  mergeEnv(K_SCHEMA, options);
  mergeEnv(K_HOST, options);
  mergeEnv(K_PORT, options);

  if (!options.enabled) {
    return;
  }

  api.addHTMLHeadScript({
    src: `${options.schema}://${options.host}:${options.port}/vorlon.js`
  });
}