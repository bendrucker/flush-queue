'use strict'

import test from 'tape'
import {spy} from 'sinon'
import Queue from '../'

test('FlushQueue', (t) => {
  const queue = new Queue()
  t.test('flush', (t) => {
    t.throws(queue.flush.bind(queue), 'No deferred', 'throws when empty')
    const fn = spy()
    queue.add(fn)
    queue.flush()
    t.ok(fn.called, 'calls functions')
    t.equal(queue.size, 0, 'clears after run')
    fn.reset()
    queue.add(() => {
      queue.add(fn)
    })
    queue.flush()
    t.ok(fn.called, 'calls functions added during flush')
    queue.add(() => {
      queue.flush()
    })
    queue.flush()
    t.pass('prevents recursive flush')
    t.end()
  })
  t.end()
})
