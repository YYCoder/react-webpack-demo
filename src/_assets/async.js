import Loadable from 'react-loadable'
import Loading from 'components/loading-page'

export default function AsyncComponent(opts) {
  let options = {}
  if (typeof opts === 'function') {
    options.loader = opts
  }
  else if (typeof opts === 'object') {
    if (!opts.hasOwnProperty('loader')) throw new Error('AsyncComponent Error: 异步组件loader函数未传')
    options = Object.assign(options, opts)
  }
  return Loadable(Object.assign({
    loading: Loading,
    delay: 200,
    timeout: 10000,
  }, options))
}