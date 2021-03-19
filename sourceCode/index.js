let votePageParser = require("./vote").votePageParser;
let leadersPageParser = require("./leaders").leadersPageParser;
let chartPageParser = require("./chart").chartPageParser;
let diagramPageParser = require("./diagram").diagramPageParser;
let activityPageParser = require("./activity").activityPageParser;

let controlPanel = require("./_controlPanel.js").controlPanel;

let prepareData = (entities, { sprintId }) => {
  controlPanel.init(entities, sprintId);
  let curSprint = controlPanel.getSprintById(sprintId);
  let curCommits = controlPanel.getSprintCommits(curSprint);
  let leadersData = leadersPageParser(controlPanel, curCommits, sprintId);
  let chartData = chartPageParser(
    controlPanel,
    leadersData.data.users.slice(0, 3),
    curCommits
  );
  let diagramData = diagramPageParser(controlPanel);
  let activityData = activityPageParser(controlPanel, curSprint, curCommits);
  let voteData = votePageParser(controlPanel, curSprint);
  return [voteData, leadersData, chartData, diagramData, activityData];
};

module.exports = { prepareData };
