let diagramPageParser = (controlPanel) => {
  // сформируем данные для страницы круговой диаграммы
  let curSprint = controlPanel.getCurrentSprint();
  let parsedData = {
    alias: "diagram",
    data: {
      title: "Размер коммитов",
      subtitle: curSprint.name,
      totalText: "",
      differenceText: "",
      categories: [
        { title: "> 1001 строки", valueText: "", differenceText: "" },
        { title: "501 — 1000 строк", valueText: "", differenceText: "" },
        { title: "101 — 500 строк", valueText: "", differenceText: "" },
        { title: "1 — 100 строк", valueText: "", differenceText: "" },
      ],
    },
  };

  function countSizeOfCommitsOfSprint(controlPanel, sprint) {
    let summaries = controlPanel.getAllSummaries();
    let commits = controlPanel.getSprintCommits(sprint);

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
  const sum = (array) => array.reduce((prev, cur) => prev + cur);

  let lastSprint = controlPanel.getSprintById(curSprint.id - 1);
  let lastSizes = countSizeOfCommitsOfSprint(controlPanel, lastSprint);
  let curSizes = countSizeOfCommitsOfSprint(controlPanel, curSprint);
  let word;

  word = controlPanel.getNoun(sum(curSizes), "коммит", "коммита", "коммитов");
  parsedData.data.totalText = `${sum(curSizes)} ${word}`;
  let val = sum(curSizes) - sum(lastSizes);
  parsedData.data.differenceText = `${val >= 0 ? "+" : ""}${val} с прошлого спринта`;

  for (let i = 0; i < 4; i++) {
    word = controlPanel.getNoun(curSizes[i], "коммит", "коммита", "коммитов");
    parsedData.data.categories[i].valueText = `${curSizes[i]} ${word}`;

    let val = curSizes[i] - lastSizes[i];
    word = controlPanel.getNoun(val, "коммит", "коммита", "коммитов");
    parsedData.data.categories[i].differenceText = `${val >= 0 ? "+" : ""}${val} коммитов`;
  }

  return parsedData;
};

module.exports = { diagramPageParser };
