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

function parseValue(value) {
  if (value === "true") {
    return true
  }
  if (value === "false") {
    return false
  }
  return value
}

function getEnvValue(key) {
  return parseValue(process.env[key])
}

function mergeEnvValue(key, options) {
  const value = getEnvValue(key)
  if (value === undefined || value === null) {
    return
  }
  switch (key) {
    case K_ENABLED:
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

function isValidValue(value) {
  const type = typeof value
  return (type === "string") || (type === "number") || value === false
}

export default function (api, options = defaultOpt) {
  if (options !== defaultOpt) {
    options = { ...defaultOpt, ...options }
  }

  mergeEnvValue(K_ENABLED, options)
  mergeEnvValue(K_SCHEMA, options)
  mergeEnvValue(K_HOST, options)
  mergeEnvValue(K_PORT, options)

  if (!options.enabled) {
    return
  }

  let src = ""

  if (isValidValue(options.port)) {
    if (options.port === false) {
      src = "/vorlon.js"
    } else {
      src = `:${options.port}/vorlon.js`
    }
  }

  if (isValidValue(options.host)) {
    if (options.host !== false) {
      src = options.host + src
    }
  }

  if (isValidValue(options.schema)) {
    if (options.schema === false) {
      src = "//" + src
    } else {
      src = options.schema + "://" + src
    }
  }

  api.log.pending('Inject vorlon.js src: ', src);

  api.addHTMLHeadScript({
    src
  })
}
