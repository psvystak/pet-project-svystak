<template>
  <form @submit.prevent="submit">
    <input type="text" placeholder="First name" v-model="first_name">
    <input type="text" placeholder="Last name" v-model="last_name">
    <input type="text" placeholder="Phone" v-model="phone_number">
    <button type="submit">{{ dynamicText }}</button>
    <hr>
  </form>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      phone_number: "",
      submitText: ""
    };
  },
  computed: {
    ...mapGetters(["editMode", "getEditedUser"]),
    dynamicText: function () {
      if (this.editMode) {
        this.first_name = this.getEditedUser.first_name;
        this.last_name = this.getEditedUser.last_name;
        this.phone_number = this.getEditedUser.phone_number;
        return "Edit user"
      } else {
        this.first_name = "";
        this.last_name = "";
        this.phone_number = "";
        return "Create user"
      }
    }
  },
  methods: {
    ...mapMutations(["switchMode"]),
    ...mapActions(["addUserToDb", "editUserInDB"]),
    submit() {
      if (this.editMode) {
        if ((this.first_name === this.getEditedUser.first_name) &&
            (this.last_name === this.getEditedUser.last_name) &&
            (this.phone_number === this.getEditedUser.phone_number)) {
          this.switchMode(this.getEditedUser);
          return
        }
        this.editUserInDB(
            {
              first_name: this.first_name,
              last_name: this.last_name,
              phone_number: this.phone_number,
              id: this.getEditedUser._id
            }
        )
      } else {
        this.addUserToDb({
          first_name: this.first_name,
          last_name: this.last_name,
          phone_number: this.phone_number
        });
      }
      this.first_name = this.last_name = this.phone_number = "";
    }
  }
};
</script>


<style scoped>
input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>

