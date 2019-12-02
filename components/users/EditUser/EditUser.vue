<template>
  <transition appear name="fade">
    <div v-if="active" class="add-user">
      <div class="add-user__window">
        <div class="add-user__avatar">
          <div class="add-user__avatar-icon">
            <svg-icon :name="user.icon" />
          </div>
          <div class="add-user__avatar-update" @click="updateSample">
            <svg-icon name="update" />
          </div>
        </div>
        <div class="add-user__form">
          <div class="add-user__form-title tp-heading--medium">Enter your name</div>
          <input class="add-user__form-input"
            :placeholder="user.pseudoname" v-model="name" />
            <button class="add-user__form-btn btn--save" @click.stop="save">Save</button>
            <button class="add-user__form-btn btn--cancel" @click.stop="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
// avatars
import animals from '~/demodata/animals.js';
export default {
  name: 'EditUser',
  props: {
    active: Boolean
  },

  data() {
    return {
      name: '',
      user: {}
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },

  methods: {
    getSample() {
      let sample = _.sample(animals)
      return {
        icon: sample,
        pseudoname: `Undefined wild ${_.upperFirst(sample)}`,
      }
    },
    updateSample() {
      this.user = this.getSample();
    },
    setInitState() {
      this.user = {
        icon: this.currentUser.icon,
        pseudoname: this.currentUser.name,
      };
      this.name = '';
    },
    save() {
      let params = {
        ...this.user,
        name: this.name || this.user.pseudoname
      };
      this.$store.commit('updateUser', params)
      this.$emit('update:active', false);
      this.setInitState();
    },
    cancel() {
      this.setInitState();
      this.$emit('update:active', false);
    }
  },

  created() {
    this.setInitState();
  }
};
</script>

<style src="./EditUser.styl" lang="stylus"></style>