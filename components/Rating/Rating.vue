<template>
  <div class="rating">
    <div class="rating__title">Top gamers</div>
    <transition-group class="rating__list" tag="ul">
      <li v-for="user in users" :key="user.id" class="rating__item">
        <user :user="user" />
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

  },

  data() {
    return {
      users: this.generateDemoUsers()
    }
  },

  methods: {
    generateDemoUsers() {
      let result = [];
      animals.forEach((item, index) => {
        result.push({
          id: index,
          icon: item,
          name: item[0].toUpperCase() + item.slice(1)
        })
      });
      return result;
    }
  }
};
</script>

<style src="./Rating.styl" lang="stylus"></style>