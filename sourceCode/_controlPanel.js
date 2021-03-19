let controlPanel = {
  init: (entities, sprintId) => {
    this.sprintId = sprintId;
    // заглушка - если нужный спринт не найдется, то возвращается undefinedSprint
    this.undefinedSprint = { startAt: -1, finishAt: -1 };
    // сформировал обьект this.entities = { entityName: smth }
    // User, Summary и Sprint хранятся в формате { entityId: Entity }
    // остальные сущности хранятся в массивах Entity[]
    this._entities = {
      User: {},
      Project: [],
      Sprint: [],
      Commit: [],
      Summary: {},
      Issue: [],
      Comment: [],
    };
    entities.forEach((entity) => {
      switch (entity.type) {
        case "User":
          this._entities.User[entity.id] = {
            id: entity.id,
            name: entity.name,
            avatar: entity.avatar,
            valueText: "",
          };
          break;
        case "Summary":
          this._entities.Summary[entity.id] = entity;
          break;
        case "Sprint":
          this._entities.Sprint[entity.id] = entity;
        default:
          this._entities[entity.type].push(entity);
          break;
      }
    });
  },
  getCurrentSprintId: () => this.sprintId,
  getUsers: () => this._entities.User,
  getSummaries: () => this._entities.Summary,
  getSprintById: (sprintId) => {
    // находит спринт по его id и если его нет, возвращаем заглушку
    let sprints = this._entities.Sprint;
    return sprints[sprintId] ?? this.undefinedSprint;
  },
  getSprintCommits: (sprint) => {
    // находит все коммиты за спринт: Commit[]
    let { startAt, finishAt } = sprint;
    let commits = this._entities.Commit;
    return commits.filter(
      (commit) => startAt <= commit.timestamp && commit.timestamp <= finishAt
    );
  },
  countCommitsByUsers: (commits) => {
    // считает сколько юзеры сделали коммитов: {userId: countOfCommits}
    let usersCommitsCount = {};
    commits.forEach((commit) => {
      let id = commit.author.id ?? commit.author;
      if (id in usersCommitsCount) usersCommitsCount[id] += 1;
      else usersCommitsCount[id] = 1;
    });
    return usersCommitsCount;
  },
  countLikesToCommentsByUsers: (sprint) => {
    // считает лайки на комментарии юзеров: {userId: countOfLikesToComments}
    let { startAt, finishAt } = sprint;
    let comments = this._entities.Comment;
    let likesToCommentsByUsers = {};
    comments.forEach((comment) => {
      if (startAt <= comment.createdAt && comment.createdAt <= finishAt) {
        let id = comment.author.id ?? comment.author;
        if (id in likesToCommentsByUsers)
          likesToCommentsByUsers[id] += (comment.likes ?? []).length;
        else likesToCommentsByUsers[id] = (comment.likes ?? []).length;
      }
    });
    return likesToCommentsByUsers;
  },
};

module.exports = { controlPanel };
