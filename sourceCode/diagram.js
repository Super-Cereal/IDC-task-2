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
        { title: "> 1001 строки", valueText: "30 коммитов", differenceText: "+8 коммитов" },
        { title: "501 — 1000 строк", valueText: "32 коммита", differenceText: "+6 коммитов" },
        { title: "101 — 500 строк", valueText: "58 коммитов", differenceText: "+16 коммитов" },
        { title: "1 — 100 строк", valueText: "62 коммита", differenceText: "+12 коммитов" },
      ],
    },
  };

  function countSizeOfCommitsOfSprint(controlPanel, sprintId) {
    let summaries = controlPanel.getSummaries();
    let commits = controlPanel.getSprintCommits(controlPanel.getSprintById(sprintId));
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
  parsedData.data.differenceText = `${val >= 0 ? "+" : ""}${val} с прошлого спринта`;

  for (let i = 0; i < 4; i++) {
    parsedData.data.categories[i].valueText = `${curSizes[i]} коммитов`;
    let val = curSizes[i] - lastSizes[i];
    parsedData.data.categories[i].differenceText = `${val >= 0 ? "+" : ""}${val} коммитов`;
  }
  return parsedData;
};

module.exports = { diagramPageParser };
