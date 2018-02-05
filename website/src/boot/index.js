import Vue from 'vue'
import Router from 'vue-router'
import config from '../doc.config'
import Documentation from '@/components/Documentation'
Vue.use(Router)
if (config.plugins && Array.isArray(config.plugins)) {
  config.plugins.forEach(plugin => Vue.use(plugin.default || plugin))
}
function flatten (arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

function join (...rest) {
  return ('/' + rest.join('/')).replace('//', '/')
}

function genRouter (docConf) {
  let routes = []
  let base = docConf.base || '/'

  if (docConf.category && Array.isArray(docConf.category)) {
    docConf.category.forEach((category) => {
      let route = {}
      route.path = join(base, category.base)
      route.name = category.label
      route.component = Documentation
      route.children = genRouter(category).map(route => {
        route.path = join(base, route.path)
        return route
      })
      routes.push(route)
    })
  }
  let keys = Object.keys(docConf.include)
  keys.forEach(key => {
    let route = {}
    let isPromise = !!docConf.include[key].then
    route.path = join(base, key)
    route.name = key
    Object.defineProperty(route, '__label', {value: isPromise ? key : docConf.include[key].label})
    route.component = Documentation
    routes.push(route)
    Vue.component(
      `x-${key}`,
      () => isPromise ? docConf.include[key] : Promise.resolve(docConf.include[key])
    )
  })
  return routes
}

let routes = []

if (config.lang) {
  routes = flatten(Object.keys(config.lang).map(key => {
    config.lang[key].docs.base = join(key, config.lang[key].docs.base)
    let routes = genRouter(config.lang[key].docs)
    config.lang[key].routes = routes
    return routes
  }))
} else {
  routes = genRouter(config.docs)
  config.routes = routes
}

export default {
  config,
  router: new Router({ routes })
}
