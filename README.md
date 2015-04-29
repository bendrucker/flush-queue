# flush-queue [![Build Status](https://travis-ci.org/bendrucker/flush-queue.svg?branch=master)](https://travis-ci.org/bendrucker/flush-queue)
Queue a set of functions to be executed synchronously

## Installing

```sh
$ npm install flush-queue
```

## API

A `FlushQueue` is a subclass of [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). You'll manipulate the queue with `Set` methods like `add`, `delete`, and `clear`.

##### `queue.flush()` -> `undefined`

Calling `queue.flush` will iterate through the functions in the queue, in insertion order, calling each. If the queue is empty when `flush` is called, an exception is thrown. The queue protects against recursive `flush` calls, so you can do this:

```js
queue.add(() => {
  queue.flush()
})
