let chartPageParser = (controlPanel, topUsers) => {
  // сформируем данные для страницы диаграммы
  let curSprint = controlPanel.getCurrentSprint();
  let parsedData = {
    alias: "chart",
    data: {
      title: "Коммиты",
      subtitle: curSprint.name,
      users: topUsers,
      values: [],
    },
  };

  let curCommits = controlPanel.getCurrentCommits();
  let values = parsedData.data.values;

  let sprints = controlPanel.getAllSprints();
  sprints.forEach((sprint) => {
    // формируем шаблон для любого спринта
    let obj = { title: sprint.id, hint: sprint.name };
    if (sprint.id === curSprint.id) {
      // если обрабатывается текущий спринт, то добавляет параметр activity
      obj.value = curCommits.length;
      obj.active = true;
    } else obj.value = controlPanel.getSprintCommits(sprint).length;
    values.push(obj);
  });

  return parsedData;
};

module.exports = { chartPageParser };
