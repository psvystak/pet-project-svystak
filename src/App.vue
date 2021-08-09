<template>
  <v-app>
    <user-form/>
    <div class="user" v-for="user in validUsers" :key="user._id">
      <h2>{{user.first_name}}</h2>
      <p>{{user.last_name}}</p>
      <p>{{user.phone_number}}</p>
      <button @click="deleteUser(user._id)">delete</button>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserForm from "./components/UserForm";
export default {
  name: "app",
  computed: mapGetters(["validUsers"]),
  methods: mapActions(["fetchUsers", "deleteUser"]),
  components: { UserForm },
  async mounted() {
    this.fetchUsers();
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
</style>
