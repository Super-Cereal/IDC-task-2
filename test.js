let prepareData = require("./sourceCode/index").prepareData;
let entities = require("./input.json");

let [a, b, c, d, i] = prepareData(entities, { sprintId: 961 });
console.log(i.data)
