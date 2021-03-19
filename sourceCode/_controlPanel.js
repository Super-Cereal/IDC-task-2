const ControlPanel = class {
  constructor(entities, sprintId) {
    // сформировал обьект this.entities = { entityName: any }
    // User, Summary хранятся в обьекте { entityId: Entity }
    // остальные сущности хранятся в массивах Entity[]
    this._sortEntities(entities);
    // заглушка - если нужный спринт не найдется, то возвращается undefinedSprint
    this._sprintId = sprintId;
    this._currentSprint = this.getSprintById(sprintId);
    this._currentCommits = this.getSprintCommits(this._currentSprint);
    this._undefinedSprint = { startAt: -1, finishAt: -1 };
  }
  _sortEntities(entities) {
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
        default:
          this._entities[entity.type].push(entity);
          break;
      }
    });
    // отсортируем все коммиты по времени создания, дабы в дальнейшем
    // мы могли бы быстрее считать кол-во коммитов за
    // данный перод времени с помощью бинпоиска
    this._entities.Commit.sort((a, b) => a.timestamp - b.timestamp);
    // спринты сортируем чтобы проще составить страницу chart
    this._entities.Sprint.sort((a, b) => a.startAt - b.startAt);
  }
  getCurrentSprint() {
    return this._currentSprint;
  }
  getCurrentCommits() {
    return this._currentCommits;
  }
  getAllUsers() {
    return this._entities.User;
  }
  getAllSummaries() {
    return this._entities.Summary;
  }
  getAllSprints() {
    return this._entities.Sprint;
  }
  getSprintById(sprintId) {
    // находит спринт по его id и если его нет, возвращает заглушку
    let sprints = this._entities.Sprint;
    for (let i in sprints) if (sprints[i].id === sprintId) return sprints[i];
    return this._undefinedSprint;
  }
  getSprintCommits(sprint) {
    // находит все коммиты за спринт: Commit[]
    let { startAt, finishAt } = sprint;
    let commits = this._entities.Commit;
    // находит индексы первого и последнего за спринт коммитов
    let leftIndex = this._getSprintCommitsBinSearch(commits, startAt, "left");
    let rightIndex = this._getSprintCommitsBinSearch(commits, finishAt, "right");
    return commits.slice(leftIndex, rightIndex + 1);
  }
  _getSprintCommitsBinSearch(commits, timestamp, borderSide) {
    let l, r, mid;
    switch (borderSide) {
      case "left":
        l = -1;
        r = commits.length;
        while (r - l > 1) {
          mid = Math.floor((r + l) / 2);
          if (commits[mid].timestamp < timestamp) l = mid;
          else r = mid;
        }
        return r;
      case "right":
        l = 0;
        r = commits.length;
        while (r - l > 1) {
          mid = Math.floor((r + l) / 2);
          if (commits[mid].timestamp <= timestamp) l = mid;
          else r = mid;
        }
        return l;
    }
  }
  countUsersCommits(commits) {
    // считает сколько юзеры сделали коммитов: {userId: countOfCommits}
    let usersCommitsCount = {};
    commits.forEach((commit) => {
      let id = commit.author.id ?? commit.author;
      if (id in usersCommitsCount) usersCommitsCount[id] += 1;
      else usersCommitsCount[id] = 1;
    });
    return usersCommitsCount;
  }
  countLikesToUsers(sprint) {
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
  }
  getNoun(number, one, two, five) {
    // сколоняет слово one_two_five в зависимости от числа
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }
};

module.exports = { ControlPanel };
