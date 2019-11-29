<template>
  <div class="card" @click="tap()" :class="cardClasses">
    <div class="card__inner">
      <div class="card__front" role="presentation"></div>
      <div class="card__back">
        <svg-icon :name="card.icon" class="card__icon" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {}
  },
  computed: {
    cardClasses() {
      return {
        'card--flipped': this.card.flipped,
        'card--matched': this.card.matched,
      }
    }
  },
  
  methods: {
    tap() {
      this.$emit('tapped', this.card.id);
    },
  }
};
</script>

<style src="./Card.styl" lang="stylus"></style>