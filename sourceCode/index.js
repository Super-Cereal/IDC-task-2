let votePageParser = require("./vote").votePageParser;
let leadersPageParser = require("./leaders").leadersPageParser;
let chartPageParser = require("./chart").chartPageParser;
let diagramPageParser = require("./diagram").diagramPageParser;
let activityPageParser = require("./activity").activityPageParser;

let controlPanel = {
  init: (entities, sprintId) => {
    this.sprintId = sprintId;
    // сформировал обьект this.entities = { entityName: Entity[] | { entityId: Entity }[] }
    this.entities = {
      User: {},
      Project: [],
      Sprint: [],
      Commit: [],
      Summary: {},
      Issue: [],
      Comment: [],
    };
    entities.forEach((entity) => {
      switch (entity.type) {
        case "User":
          this.entities.User[entity.id] = {
            id: entity.id,
            name: entity.name,
            avatar: entity.avatar,
            valueText: "",
          };
          break;
        case "Summary":
          this.entities.Summary[entity.id] = entity;
          break;
        default:
          this.entities[entity.type].push(entity);
          break;
      }
    });
  },
  getCurrentSprintId: () => this.sprintId,
  getUsers: () => this.entities.User,
  getSummaries: () => this.entities.Summary,
  getSprintById: (sprintId) => {
    // находит спринт по его id и если его нет, возвращаем заглушку: Sprint
    let sprints = this.entities.Sprint;
    return (
      sprints.find((sprint) => sprint.id === sprintId) ?? {
        startAt: -1,
        finishAt: -1,
      }
    );
  },
  getSprintCommits: (sprint) => {
    // находит все коммиты за спринт: Commit[]
    let { startAt, finishAt } = sprint;
    let commits = this.entities.Commit;
    return commits.filter(
      (commit) => startAt <= commit.timestamp && commit.timestamp <= finishAt
    );
  },
  countCommitsByUsers: (commits) => {
    // считает коммиты для юзеров: {userId: countOfCommits}
    let commitsByUsers = {};
    commits.forEach((commit) => {
      let id = commit.author.id ?? commit.author;
      if (id in commitsByUsers) commitsByUsers[id] += 1;
      else commitsByUsers[id] = 1;
    });
    return commitsByUsers;
  },
  countLikesToCommentsByUsers: (sprint) => {
    // считает лайки на комментарии юзеров: {userId: countOfLikesToComments}
    let { startAt, finishAt } = sprint;
    let comments = this.entities.Comment;
    let likesToCommentsByUsers = {};
    comments.forEach((comment) => {
      if (startAt <= comment.createdAt && comment.createdAt <= finishAt) {
        let id = comment.author.id ?? comment.author;
        if (id in likesToCommentsByUsers)
          likesToCommentsByUsers[id] += (comment.likes ?? []).length;
        else likesToCommentsByUsers[id] = (comment.likes ?? []).length;
      }
    });
    return likesToCommentsByUsers;
  },
};

let prepareData = (entities, { sprintId }) => {
  controlPanel.init(entities, sprintId);
  let curSprint = controlPanel.getSprintById(sprintId);
  let curCommits = controlPanel.getSprintCommits(curSprint);

  let leadersData = leadersPageParser(controlPanel, curCommits);
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
