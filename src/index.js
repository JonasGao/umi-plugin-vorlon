// ref:
// - https://umijs.org/plugin/develop.html

const defaultOpt = {
  enabled: true,
  schema: 'http',
  host: '127.0.0.1',
  port: '1337',
}
const PREFIX = "VORLON_"
const K_ENABLED = `${PREFIX}ENABLED`
const K_SCHEMA = `${PREFIX}SCHEMA`
const K_HOST = `${PREFIX}HOST`
const K_PORT = `${PREFIX}PORT`

function mergeEnv(key, options) {
  let value = process.env[key]
  if (!value) {
    return
  }
  switch (key) {
    case K_ENABLED:
      try {
        value = !!JSON.parse(value)
      } catch (ignored) {
        value = value === "true"
      }
      options.enabled = value
      break
    case K_SCHEMA:
      options.schema = value
      break
    case K_HOST:
      options.host = value
      break
    case K_PORT:
      options.port = value
      break
  }
}

export default function (api, options = defaultOpt) {
  if (options !== defaultOpt) {
    options = { ...defaultOpt, ...options }
  }

  mergeEnv(K_ENABLED, options)
  mergeEnv(K_SCHEMA, options)
  mergeEnv(K_HOST, options)
  mergeEnv(K_PORT, options)

  if (!options.enabled) {
    return
  }

  api.addHTMLHeadScript({
    src: `${options.schema}://${options.host}:${options.port}/vorlon.js`,
  })
}
