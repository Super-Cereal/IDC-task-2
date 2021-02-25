let activityPageParser = (controlPanel, sprint, commits) => {
  // сформируем данные для страницы активности
  let sprintId = controlPanel.getCurrentSprintId();
  let parsedData = {
    alias: "activity",
    data: {
      title: "Коммиты, 1 неделя",
      subtitle: `Спринт № ${sprintId}`,
      data: {
        mon: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        wed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        thu: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fri: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sun: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

module.exports = { activityPageParser };
