<template>
  <div class="user" :class="{current: user.current}" @click="onClick">
    <div v-if="user.current" class="user__settings">
      <svg-icon name="settings" />
    </div>
    <div class="user__info">
      <div class="user__avatar">
        <svg-icon :name="user.icon" />
      </div>
      <div class="user__name">{{ user.name }}</div>
    </div>
    <div class="user__time">{{ getFormattedTime(user.time) }}</div>
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
  },

  methods: {
    getFormattedTime(value) {
      let seconds = Math.floor((value / 1000) % 60),
      minutes = Math.floor((value / (1000 * 60)) % 60),
      hours = Math.floor((value / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      let str = `${minutes}:${seconds}`;
      if (hours > 0) {
        str = `${hours}:` + str;
      }

      return str;
    },
    onClick() {
      if (!this.user.current) return;
      this.$emit('click');
    }
  }
};
</script>

<style src="./User.styl" lang="stylus"></style>