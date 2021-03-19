let leadersPageParser = (controlPanel) => {
  // сформируем данные для страницы лидеров
  let curSprint = controlPanel.getCurrentSprint();
  let parsedData = {
    alias: "leaders",
    data: {
      title: "Больше всего коммитов",
      subtitle: curSprint.name,
      emoji: "👑",
      users: [],
    },
  };

  let commits = controlPanel.getCurrentCommits()
  let usersCommitsCount = controlPanel.countUsersCommits(commits);
  let users = controlPanel.getAllUsers();
  for (let userId in users) {
    let x = { ...users[userId], valueText: `${usersCommitsCount[userId]}` };
    parsedData.data.users.push(x);
  }
  // сортируем в порядке убывания числа коммитов
  parsedData.data.users.sort((prev, cur) => cur.valueText - prev.valueText);

  return parsedData;
};

module.exports = { leadersPageParser };
