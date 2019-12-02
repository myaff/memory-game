<template>
  <div class="rating">
    <div class="rating__title tp-heading--big tp-text--center">Top gamers</div>
    <transition-group name="flip-list" class="rating__list" tag="ul">
      <li v-for="user in sortedUsers" :key="user.id" class="rating__item">
        <user :user="user" @click="onClick" />
      </li>
    </transition-group>
  </div>
</template>
<script>
// demodata
import animals from '~/demodata/animals';
// components
import { User } from '~/components/users'
export default {
  name: 'Rating',
  components: {
    User,
  },

  computed: {
    timer() {
      return this.$store.state.timer;
    },
    currentUser() {
      return this.$store.state.user;
    },
    sortedUsers() {
      return _.sortBy(this.users, 'time');
    },
  },

  data() {
    return {
      users: this.generateDemoUsers(),
      user: {}
    }
  },

  methods: {
    generateDemoUsers() {
      let result = [];
      animals.forEach((item, index) => {
        result.push({
          id: _.uniqueId('user_'),
          icon: item,
          name: _.upperFirst(item),
          time: 150000 * _.random(0.5, 1.5)
        })
      });
      return result;
    },
    onClick() {
      this.$emit('click');
    }
  },

  created() {
    this.user = {
      id: this.currentUser.id,
      name: this.currentUser.name,
      icon: this.currentUser.icon,
      current: this.currentUser.current,
      time: 0
    };
    this.users.push(this.user);
  },

  watch: {
    timer: function() {
      this.user.time = this.timer;
    },
    currentUser: function() {
      this.user.name = this.currentUser.name;
      this.user.icon = this.currentUser.icon;
    }
  }
};
</script>

<style src="./Rating.styl" lang="stylus"></style>