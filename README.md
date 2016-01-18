# universal-api

[WIP] `superagent` wrapper intended to help writting libs for third-party api running both on server and browser via jsonp

> Why?

Because it sucks to have different libs on backend and frontend.

> Why `superagent`?

- node libs (you could use them through `browserify`, however `webpack` support is broken (https://github.com/sindresorhus/got/issues/127#issuecomment-171915766))
  - [request](https://www.npmjs.com/package/request)
  - [got](https://www.npmjs.com/package/got)

- universal libs
  - [superagent](https://www.npmjs.com/package/superagent)
    - current choice
  - [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch)
    - no jsonp support
  - [axios](https://www.npmjs.com/package/axios)
    - no jsonp support and it won't be implemented (https://github.com/mzabriskie/axios/pull/15)

## Install

```
$ npm install universal-api --save
```

## Dependents

- [`vk-universal-api`](https://www.npmjs.com/package/vk-universal-api)

## License

MIT © [ewnd9](http://ewnd9.com)
