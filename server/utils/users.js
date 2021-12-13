// [{
//   id: 'sdfgsdfgsdfg',
//   name: 'WDJ',
//   room: 'node js'
// }]


class Users {
  constructor() {
    this.users = [];
  }

  addUser(name) {
    if (this.users.includes(name)) {
      return -1;
    } else {
      this.users.push(name);
      return name;
    }
  }

  addUser(id, name) {

    if (this.users.some(code => code.id === id) || this.users.some(code => code.name === name)) {
      return -1;
    } else {
      let user = { id, name};
      this.users.push(user);
      return user;
    }
  }

  //addUser(id, name, room) {
  //  let user = {id, name, room};
  //  this.users.push(user);
  //  return user;
  //}

  getUserList () {
    //let users = this.users.filter((user) => user.room === room);
    let namesArray = this.users.map((user) => user.name);
    return namesArray;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  //removeUser(name) {
  //  if (this.users.includes(name)) {
  //    this.users = this.users.filter((element) => element !== name);
  //    return name;
  //  } else {
  //    return -1;
  //  }
  //}

  removeUser(id) {
    let user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
      return user.name;
    }
    return -1;
  }
}

module.exports = {Users};