let votePageParser = (controlPanel, sprint) => {
    // сформируем данные для страницы голосования
    let sprintId = controlPanel.getCurrentSprintId();
    let parsedData = {
      alias: "vote",
      data: {
        title: "Самый 🔎 внимательный разработчик",
        subtitle: `Спринт № ${sprintId}`,
        emoji: "🔎",
        users: [],
      },
    };
  
    let users = controlPanel.getUsers();
    let likesToUsersId = controlPanel.countLikesToCommentsByUsers(sprint);
    for (let userId in likesToUsersId) {
      let x = { ...users[userId], valueText: likesToUsersId[userId] };
      parsedData.data.users.push(x);
    }
    parsedData.data.users.sort((prev, cur) => cur.valueText - prev.valueText);
    parsedData.data.users = parsedData.data.users.map((user) => ({
      ...user,
      valueText: `${user.valueText} голосов`,
    }));
    return parsedData;
  };
  let leadersPageParser = (controlPanel, commits, sprintId) => {
    // сформируем данные для страницы лидеров
    let parsedData = {
      alias: "leaders",
      data: {
        title: "Больше всего коммитов",
        subtitle: "Спринт № " + sprintId,
        emoji: "👑",
        users: [],
      },
    };
  
    let users = controlPanel.getUsers();
    let usersCommits = controlPanel.countCommitsByUsers(commits);
    for (let userId in users) {
      let x = { ...users[userId], valueText: usersCommits[userId] };
      parsedData.data.users.push(x);
    }
    parsedData.data.users.sort((prev, cur) => cur.valueText - prev.valueText);
    return parsedData;
  };
  let chartPageParser = (controlPanel, topUsers, commits) => {
    // сформируем данные для страницы диаграммы
    let sprintId = controlPanel.getCurrentSprintId();
    let parsedData = {
      alias: "chart",
      data: {
        title: "Коммиты",
        subtitle: `Спринт № ${sprintId}`,
        users: topUsers,
        values: [],
      },
    };
  
    let values = parsedData.data.values;
    for (let i = -6; i < 4; i++) {
      if (i === 0)
        values.push({ title: sprintId, value: commits.length, active: true });
      else if (sprintId + i <= 0) continue;
      else {
        let sprint = controlPanel.getSprintById(sprintId + i);
        let commitsBySprintId = controlPanel.getSprintCommits(sprint);
        values.push({ title: sprintId + i, value: commitsBySprintId.length });
      }
    }
    return parsedData;
  };
  let diagramPageParser = (controlPanel) => {
    // сформируем данные для страницы круговой диаграммы
    let sprintId = controlPanel.getCurrentSprintId();
    let parsedData = {
      alias: "diagram",
      data: {
        title: "Размер коммитов",
        subtitle: `Спринт № ${sprintId}`,
        totalText: "",
        differenceText: "",
        categories: [
          {
            title: "> 1001 строки",
            valueText: "30 коммитов",
            differenceText: "+8 коммитов",
          },
          {
            title: "501 — 1000 строк",
            valueText: "32 коммита",
            differenceText: "+6 коммитов",
          },
          {
            title: "101 — 500 строк",
            valueText: "58 коммитов",
            differenceText: "+16 коммитов",
          },
          {
            title: "1 — 100 строк",
            valueText: "62 коммита",
            differenceText: "+12 коммитов",
          },
        ],
      },
    };
  
    function countSizeOfCommitsOfSprint(controlPanel, sprintId) {
      let summaries = controlPanel.getSummaries();
      let commits = controlPanel.getSprintCommits(
        controlPanel.getSprintById(sprintId)
      );
      // [0: > 1001, 1: 501 - 1000, 2: 101 - 500, 3: 1 - 100]
      let res = [0, 0, 0, 0];
      commits.forEach((commit) => {
        let size = 0;
        commit.summaries.forEach((summary) => {
          let summaryId = summary.id ?? summary;
          size += summaries[summaryId].added + summaries[summaryId].removed;
        });
        if (size >= 1001) res[0]++;
        else if (size >= 501) res[1]++;
        else if (size >= 101) res[2]++;
        else if (size >= 1) res[3]++;
      });
      return res;
    }
    let sum = (array) => array.reduce((prev, cur) => prev + cur);
  
    let lastSizes = countSizeOfCommitsOfSprint(controlPanel, sprintId - 1);
    let curSizes = countSizeOfCommitsOfSprint(controlPanel, sprintId);
    parsedData.data.totalText = `${sum(curSizes)} коммита`;
    let val = sum(curSizes) - sum(lastSizes);
    parsedData.data.differenceText = `${
      val >= 0 ? "+" : ""
    }${val} с прошлого спринта`;
  
    for (let i = 0; i < 4; i++) {
      parsedData.data.categories[i].valueText = `${curSizes[i]} коммитов`;
      let val = curSizes[i] - lastSizes[i];
      parsedData.data.categories[i].differenceText = `${
        val >= 0 ? "+" : ""
      }${val} коммитов`;
    }
    return parsedData;
  };
  let activityPageParser = (controlPanel, sprint, commits) => {
    // сформируем данные для страницы активности
    let sprintId = controlPanel.getCurrentSprintId();
    let parsedData = {
      alias: "activity",
      data: {
        title: "Коммиты, 1 неделя",
        subtitle: `Спринт № ${sprintId}`,
        data: {
          mon: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          tue: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          wed: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          thu: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          fri: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          sat: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          sun: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
        },
      },
    };
  
    let data = parsedData.data.data;
    commits.forEach((commit) => {
      let sinceWeekStart = commit.timestamp - sprint.startAt;
      let day = Math.floor(sinceWeekStart / (24 * 60 * 60 * 1000));
      let sinceDayStart = sinceWeekStart % (24 * 60 * 60 * 1000);
      let hour = Math.floor(sinceDayStart / (60 * 60 * 1000));
  
      if (day === 0) data.mon[hour]++;
      if (day === 1) data.tue[hour]++;
      if (day === 2) data.wed[hour]++;
      if (day === 3) data.thu[hour]++;
      if (day === 4) data.fri[hour]++;
      if (day === 5) data.sat[hour]++;
      if (day === 6) data.sun[hour]++;
    });
    return parsedData;
  };
  
  let controlPanel = {
    init: (entities, sprintId) => {
      // сформировал обьект this.entities = { entityName: Entity[] | { entityId: Entity }[] }
      this.sprintId = sprintId;
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
  