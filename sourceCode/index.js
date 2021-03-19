let votePageParser = require("./vote").votePageParser;
let leadersPageParser = require("./leaders").leadersPageParser;
let chartPageParser = require("./chart").chartPageParser;
let diagramPageParser = require("./diagram").diagramPageParser;
let activityPageParser = require("./activity").activityPageParser;

let ControlPanel = require("./_controlPanel.js").ControlPanel;

let prepareData = (entities, { sprintId }) => {
  let controlPanel = new ControlPanel(entities, sprintId);

  let voteData = votePageParser(controlPanel);
  let leadersData = leadersPageParser(controlPanel);
  let chartData = chartPageParser(controlPanel, leadersData.data.users);
  let diagramData = diagramPageParser(controlPanel);
  let activityData = activityPageParser(controlPanel);
  return [voteData, leadersData, chartData, diagramData, activityData];
};

module.exports = { prepareData };
