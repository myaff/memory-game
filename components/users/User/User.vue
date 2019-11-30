<template>
  <div class="user">
    <div class="user__avatar">
      <svg-icon :name="user.icon" />
    </div>
    <div class="user__name">{{ user.name }}</div>
  </div>
</template>
<script>
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      
    }
  }
};
</script>

<style src="./User.styl" lang="stylus"></style>