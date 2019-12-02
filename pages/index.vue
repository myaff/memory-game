<template>
  <div class="home">
    <div class="home__main">
      <game />
      <edit-user :active.sync="editingUser" />
    </div>
    <div class="home__aside">
      <rating @click="editUser" />
    </div>
  </div>
</template>

<script>
import Game from '~/components/Game/Game';
import Rating from '~/components/Rating/Rating';
import { EditUser } from '~/components/users';
export default {
  components: {
    Game,
    Rating,
    EditUser,
  },

  data() {
    return {
      editingUser: false
    }
  },

  computed: {
  },

  methods: {
    editUser() {
      this.editingUser = true;
    }
  }
}
</script>

<style src="~/assets/stylus/pages/home.styl" lang="stylus"></style>