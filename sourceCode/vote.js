let votePageParser = (controlPanel) => {
  // сформируем данные для страницы голосования
  let curSprint = controlPanel.getCurrentSprint();
  let parsedData = {
    alias: "vote",
    data: {
      title: "Самый 🔎 внимательный разработчик",
      subtitle: curSprint.name,
      emoji: "🔎",
      users: [],
    },
  };

  let users = controlPanel.getAllUsers();
  let usersLikesCount = controlPanel.countLikesToUsers(curSprint);
  for (let userId in usersLikesCount) {
    let x = { ...users[userId], valueText: usersLikesCount[userId] };
    parsedData.data.users.push(x);
  }
  // сортируем юзеров в порядке убывания числа лайков к их комментариям
  parsedData.data.users.sort((prev, cur) => cur.valueText - prev.valueText);
  parsedData.data.users = parsedData.data.users.map((user) => {
    let word = controlPanel.getNoun(user.valueText, "голос", "голоса", "голосов");
    return { ...user, valueText: `${user.valueText} ${word}` };
  });
  return parsedData;
};

module.exports = { votePageParser };
