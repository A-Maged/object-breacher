const colors = require("colors");
const Benchmark = require("benchmark");
const objectBreacher = require("./lib/index");
const dotProp = require("dot-prop");
const objectPath = require("object-path");
const nestedProperty = require("nested-property");
const hoek = require("@hapi/hoek");
const _ = require("lodash");

const newObj = () => ({
  a: {
    b: ["c", "d"],
    e: "f",
    g: {
      k: "l",
    },
    "dot.dot": "don't trip now",
  },
});

var suite1 = new Benchmark.Suite("get");

suite1
  .add("lodash#get", function () {
    let obj = newObj();
    _.get(obj, "a.b");
  })
  .add("object-breacher#get", function () {
    let obj = newObj();
    objectBreacher.get(obj, "a.b");
  })
  .add("hoek#get", function () {
    let obj = newObj();
    hoek.reach(obj, "a.b");
  })
  .add("nested-property#get", function () {
    let obj = newObj();
    nestedProperty.get(obj, "a.b");
  })
  .add("dot-prop#get", function () {
    let obj = newObj();
    dotProp.get(obj, "a.b");
  })
  .add("object-path#get", function () {
    let obj = newObj();
    objectPath.get(obj, "a.b");
  })
  .on("start", onStart)
  .on("cycle", onCycle)
  .on("complete", onComplete)
  .run({ async: true });

let suite2 = new Benchmark.Suite("set");

suite2
  .add("lodash#set", function () {
    let obj = newObj();
    _.set(obj, "a.b.z", ";)");
  })
  .add("nested-property#set", function () {
    let obj = newObj();
    nestedProperty.set(obj, "a.b.z", ";)");
  })
  .add("dot-prop#set", function () {
    let obj = newObj();
    dotProp.set(obj, "a.b.z", ";)");
  })
  .add("object-breacher#set", function () {
    let obj = newObj();
    objectBreacher.set(obj, "a.b.z", ";)");
  })
  .add("object-path#set", function () {
    let obj = newObj();
    objectPath.set(obj, "a.b.z", ";)");
  })
  .on("cycle", onCycle)
  .on("complete", onComplete)
  .run({ async: true });

function onStart() {
  console.log("[*] Started Benchmarks".brightYellow);
}

function onCycle(event) {
  console.log(`[+] ${String(event.target)}`.gray);
}

function onComplete() {
  console.log(
    `\nFastest is  ${this.filter("fastest").map("name")} \n`.brightGreen
  );
}
