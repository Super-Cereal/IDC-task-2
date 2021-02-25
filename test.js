let prepareData = require("./sourceCode/index").prepareData;
let entities = require("./input.json");

console.log(prepareData(entities, { sprintId: 961 }));
