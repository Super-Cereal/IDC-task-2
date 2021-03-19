let leadersPageParser = (controlPanel, commits) => {
  // сформируем данные для страницы лидеров
  let sprintId = controlPanel.getCurrentSprintId()
  let parsedData = {
    alias: "leaders",
    data: {
      title: "Больше всего коммитов",
      subtitle: `Спринт № ${sprintId}`,
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

module.exports = { leadersPageParser };
