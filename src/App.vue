<template>
  <v-app>
    <user-form/>
    <div v-if="allUsers.length">
      <div class="user" v-for="user in allUsers" :key="user._id">
        <h2>{{user.first_name}}</h2>
        <p>{{user.last_name}}</p>
        <p>{{user.phone_number}}</p>
        <button @click="deleteUserFromDB(user._id)">delete</button>
        <button @click="switchMode(user)">edit</button>
      </div>
    </div>
    <div v-else>
        <h2>There are no users! Please, try to add a new one</h2>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import UserForm from "./components/UserForm";
export default {
  name: "app",
  computed: mapGetters(["allUsers"]),
  methods: {
    ...mapActions(["requireUsersFromDB", "deleteUserFromDB"]),
    ...mapMutations(["switchMode"]),
  },
  components: { UserForm },
  async mounted() {
    this.requireUsersFromDB();
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}

.user {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

button {
  margin: 30px;
}
</style>
