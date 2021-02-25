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
    if (i === 0) values.push({ title: sprintId, value: commits.length, active: true });
    else if (sprintId + i <= 0) continue;
    else {
      let sprint = controlPanel.getSprintById(sprintId + i);
      let commitsBySprintId = controlPanel.getSprintCommits(sprint);
      values.push({ title: sprintId + i, value: commitsBySprintId.length });
    }
  }
  return parsedData;
};

module.exports = { chartPageParser };
