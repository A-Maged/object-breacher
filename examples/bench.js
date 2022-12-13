import * as dotProp from 'dot-prop';
import Benchmark from 'benchmark';

// These lines make "require" available
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

require('colors');
const objectBreacher = require('../dist/object-breacher.cjs.production.min');
const objectPath = require('object-path');
const nestedProperty = require('nested-property');
const hoek = require('@hapi/hoek');
const _ = require('lodash');

const newObj = () => ({
  a: {
    x: null,
    b: ['c', 'd'],
    e: 'f',
    g: {
      h: {
        get: {
          the: {
            prize: 'got it',
          },
        },
      },
    },
    'dot.dot': "don't trip now",
  },
});

var suite1 = new Benchmark.Suite('get');

suite1
  .add('lodash#get#string', function() {
    let obj = newObj();
    _.get(obj, 'a.b');
  })
  .add('object-breacher#get#string', function() {
    let obj = newObj();
    objectBreacher.get(obj, 'a.b');
  })
  .add('hoek#get#string', function() {
    let obj = newObj();
    hoek.reach(obj, 'a.b');
  })
  .add('nested-property#get#string', function() {
    let obj = newObj();
    nestedProperty.get(obj, 'a.b');
  })
  .add('dot-prop#get#string', function() {
    let obj = newObj();
    dotProp.getProperty(obj, 'a.b');
  })
  .add('object-path#get#string', function() {
    let obj = newObj();
    objectPath.get(obj, 'a.b');
  })
  .on('start', onStart)
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run({ sync: true });

var suite2 = new Benchmark.Suite('get');

suite2
  .add('lodash#get#array', function() {
    let obj = newObj();
    _.get(obj, ['a', 'g', 'h', 'get', 'the', 'prize']);
  })
  .add('object-breacher#get#array', function() {
    let obj = newObj();
    objectBreacher.get(obj, ['a', 'g', 'h', 'get', 'the', 'prize']);
  })
  .add('hoek#get#array', function() {
    let obj = newObj();
    hoek.reach(obj, ['a', 'g', 'h', 'get', 'the', 'prize']);
  })
  .add('nested-property#get#array', function() {
    let obj = newObj();
    nestedProperty.get(obj, ['a', 'g', 'h', 'get', 'the', 'prize']);
  })
  .add('object-path#get#array', function() {
    let obj = newObj();
    objectPath.get(obj, ['a', 'g', 'h', 'get', 'the', 'prize']);
  })
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run({ sync: true });

let suite3 = new Benchmark.Suite('set');

suite3
  .add('lodash#set#string', function() {
    let obj = newObj();
    _.set(obj, 'a.b.z', ';)');
  })
  .add('nested-property#set#string', function() {
    let obj = newObj();
    nestedProperty.set(obj, 'a.b.z', ';)');
  })
  .add('dot-prop#set#string', function() {
    let obj = newObj();
    dotProp.setProperty(obj, 'a.b.z', ';)');
  })
  .add('object-breacher#set#string', function() {
    let obj = newObj();
    objectBreacher.set(obj, 'a.b.z', ';)');
  })
  .add('object-path#set#string', function() {
    let obj = newObj();
    objectPath.set(obj, 'a.b.z', ';)');
  })
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run({ sync: true });

let suite4 = new Benchmark.Suite('set');

suite4
  .add('lodash#set#array', function() {
    let obj = newObj();
    _.set(obj, ['a', 'g', 'h', 'get', 'the', 'prize'], 'new prize');
  })
  .add('nested-property#set#array', function() {
    let obj = newObj();
    nestedProperty.set(
      obj,
      ['a', 'g', 'h', 'get', 'the', 'prize'],
      'new prize'
    );
  })
  .add('object-breacher#set#array', function() {
    let obj = newObj();
    objectBreacher.set(
      obj,
      ['a', 'g', 'h', 'get', 'the', 'prize'],
      'new prize'
    );
  })
  .add('object-path#set#array', function() {
    let obj = newObj();
    objectPath.set(obj, ['a', 'g', 'h', 'get', 'the', 'prize'], 'new prize');
  })
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run({ sync: true });

function onStart() {
  console.log('[*] Started Benchmarks'.brightYellow);
}

function onCycle(event) {
  console.log(`[+] ${String(event.target)}`.gray);
}

function onComplete() {
  console.log(
    `\nFastest is  ${this.filter('fastest').map('name')} \n`.brightGreen
  );
}
