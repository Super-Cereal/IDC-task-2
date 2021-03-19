let prepareData = require("./sourceCode/index").prepareData;
let entities = require("./input.json");

let testingData = require("./testingData.json");

console.time(1)
let res = prepareData(entities, { sprintId: 963 });
let [a, b, c, d, e] = res;
console.log(a.data)
console.timeEnd(1)
// for (i in res) {
//   let page = res[i];
//   let correctPage = testingData[page.alias];
//   console.log(`\n\nComparing '${page.alias}' page`);
//   let dataKeys = Object.keys(correctPage.data);
//   dataKeys.forEach((key) => {
//     let correctCur = correctPage.data[key];
//     let cur = page.data[key];
//     if (typeof cur === "string") {
//       if (cur === correctCur) console.log(`Parametr ${key} is ok`);
//       else {
//         console.log(`Parametr ${key} IS NOT ok:`);
//         console.log(`\tYour output: ${cur}`);
//         console.log(`\tCorrrect output: ${correctCur}`);
//       }
//     }
//   });
// }
