# storage-message
基于`window.localStorage`简单封装后进行消息传递的模块，适用于同一页面、跨 tab 页面、移动端不同 webview 页面之间的消息传递，前提是**不可跨域、支持`window.localStorage`**。

## install
```bash
npm i storage-message

yarn add storage-message
```

```html
<script src="dist/bundle.js"></script>
```

## usage

es module:
```js
// page 1
import {storageMessage} from 'storage-message'
const KEY = 'test'
const listener = e => {
  const {key, oldValue, newValue} = e

  console.log('data': newValue)
}
storageMessage.addEventListener(KEY, listener)

// remove event
// storageMessage.removeEventListener(KEY, listener)
```

```js
// page 2
import {storageMessage} from 'storage-message'
// send message
storageMessage.trigger(KEY, 'data from page 2')
```

global:
```js
const {storageMessage} = window.StorageMessage
```

## example
```bash
$ git clone git@github.com:daief/storage-message.git

$ cd storage-message && yarn && yarn start
```

open http://localhost:10001/example/page1.html  & http://localhost:10001/example/page2.html

![](./example/preview.gif)