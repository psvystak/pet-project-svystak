export default {
  actions: {
    async fetchUsers({commit}) {
      const res = await fetch(
          'http://127.0.0.1:3000/read',
          {
            method: 'GET'
          }
      )
      const users = await res.json()
      console.log(res);
      commit('showUsers', users)
    },
    async deleteUser({commit}, id) {
      console.log(`{"id": "${id}"}`);
      const res = await fetch(
          'http://127.0.0.1:3000/delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: `{"id": "${id}"}`
          }
      )
      const users = await res.json()
      commit('deleteUser', users)
    },
    async addUserToDb({commit}, newUser) {
      await fetch(
          'http://127.0.0.1:3000/create', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
          }
      )
      commit('pushToArray', newUser)
    }
  },
  mutations: {
    showUsers(state, users) {
      state.users = users
    },
    pushToArray(state, newUser) {
      state.users.unshift(newUser)
    },
    deleteUser(state, user) {
      state.users.unshift(user)
    }
  },
  state: {
    users: []
  },
  getters: {
    validUsers(state) {
      return state.users.filter(p => {
        return p.first_name
      })
    }
  }
}
