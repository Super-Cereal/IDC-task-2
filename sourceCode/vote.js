let votePageParser = (controlPanel, sprint) => {
  // сформируем данные для страницы голосования
  let sprintId = controlPanel.getCurrentSprintId();
  let parsedData = {
    alias: "leaders",
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

module.exports = { votePageParser };
