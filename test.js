let prepareData = require("./sourceCode/index").prepareData;
let entities = require("./input.json");

// let output = require("./output.json");

console.time("prepareData")
let res = prepareData(entities, { sprintId: 977 });
let [a, b, c, d, e] = res;
console.timeEnd("prepareData")
// активити лечить надо
// console.log(d.data)
