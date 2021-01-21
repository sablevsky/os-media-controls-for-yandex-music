'use strict'

export function curry(fn) {
  const arity = fn.length

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args)
    }
    return fn.call(null, ...args)
  }
}

export const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]

export const join = curry((str, xs) => xs.join(str))

export const mapObjectsToPrimitives = (primitiveFieldName, arr) =>
  arr.map((el) => el[primitiveFieldName])
