export default {
  actions: {
    async requireUsersFromDB({commit}) {
      try {
        const res = await fetch(
            'http://127.0.0.1:3000/read',
            {
              method: 'GET'
            }
        )
        const users = await res.json()
        commit('showUsersFromArray', users)
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUserFromDB({commit}, id) {
      try {
        const res = await fetch(
            'http://127.0.0.1:3000/delete', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"id": id})
            }
        )
        const user = await res.json()
        commit('removeUserFromArray', user.id)
      } catch (err) {
        console.log(err)
      }
    },
    async addUserToDb({commit}, newUser) {
      try {
        const res = await fetch(
            'http://127.0.0.1:3000/create', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(newUser)
            }
        )
        const userFromDB =  await res.json();
        commit('pushUserToArray', userFromDB)
      } catch (err) {
        console.log(err)
      }
    },
    async editUserInDB({commit}, user) {
      console.log(user);
      try {
        const res = await fetch(
            'http://127.0.0.1:3000/update', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            }
        )
        const userFromDB = await res.json()
        commit('editUserInArray', userFromDB.updatedUser)
      } catch (err) {
        console.log(err)
      }
    },
  },
  mutations: {
    showUsersFromArray(state, users) {
      state.users = users
    },
    pushUserToArray(state, newUser) {
      state.users.push(newUser)
    },
    removeUserFromArray(state, id) {
      if(state.edit) {
        if (id === state.editedUser.id) {
          state.edit = false;
        }
      }
      state.users.splice(state.users.findIndex((item) => item._id === id), 1);
    },
    editUserInArray(state, user) {
      state.users.splice(state.users.findIndex((item) => item._id === user.id), 1, user);
      state.edit = false;
    },
    switchMode(state, user) {
      state.edit = !state.edit;
      state.editedUser = user;
    }
  },
  state: {
    users: [],
    edit: false,
    editedUser: {}
  },
  getters: {
    allUsers(state) {
      return state.users
    },
    editMode(state) {
      return state.edit;
    },
    getEditedUser(state) {
      return state.editedUser;
    }
  }
}
