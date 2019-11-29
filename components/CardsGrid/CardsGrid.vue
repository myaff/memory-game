<template>
  <div class="cards-grid l-grid-g6x6">
    <div v-for="card in cards" :key="card.id" class="cards-grid__cell l-col">
      <transition appear name="scale">
        <slot name="card" :card="card"></slot>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardsGrid',
  props: {
    cards: {
      type: [Array, Object],
      required: true
    }
  },

  data() {
    return {
      
    }
  },
};
</script>

<style src="./CardsGrid.styl" lang="stylus"></style>