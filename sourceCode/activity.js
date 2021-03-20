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
  let curCommits = controlPanel.getCurrentCommits();
  curCommits.forEach((commit) => {
    let msSinceWeekStart = commit.timestamp - curSprint.startAt;
    let day = Math.floor(msSinceWeekStart / (24 * 60 * 60 * 1000));
    let msSinceDayStart = msSinceWeekStart % (24 * 60 * 60 * 1000);
    let hour = msSinceDayStart / (60 * 60 * 1000);
    // баг в output.json или еще где, но пришлось ставить проверку -
    // если прошло 0.9 первого дня - то это уже второй день, зн прибавим единицу
    hour = Math.floor(hour) + (hour % 1 > 0.9 ? 1 : 0);
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
