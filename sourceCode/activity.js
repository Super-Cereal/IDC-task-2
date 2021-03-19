let activityPageParser = (controlPanel) => {
  // сформируем данные для страницы активности
  let curSprint = controlPanel.getCurrentSprint();
  let parsedData = {
    alias: "activity",
    data: {
      title: "Коммиты, 1 неделя",
      subtitle: curSprint.name,
      data: {
        sun: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mon: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        wed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        thu: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fri: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    },
  };

  let data = parsedData.data.data;
  let curCommits = controlPanel.getCurrentCommits()
  curCommits.forEach((commit) => {
    let sinceWeekStart = commit.timestamp - curSprint.startAt;
    let day = Math.floor(sinceWeekStart / (24 * 60 * 60 * 1000));
    let sinceDayStart = sinceWeekStart % (24 * 60 * 60 * 1000);
    let hour = Math.floor(sinceDayStart / (60 * 60 * 1000));

    if (day === 0) data.sun[hour]++;
    else if (day === 1) data.mon[hour]++;
    else if (day === 2) data.tue[hour]++;
    else if (day === 3) data.wed[hour]++;
    else if (day === 4) data.thu[hour]++;
    else if (day === 5) data.fri[hour]++;
    else if (day === 6) data.sat[hour]++;
  });
  return parsedData;
};

module.exports = { activityPageParser };
