<template>
  <div class="game">
    <transition name="fade">
      <div v-show="active" class="game__timer tp-heading--big tp-text--center">
        {{ formattedTime }}
      </div>
    </transition>
    <cards-grid :cards="cards" class="game__cards">
      <template v-slot:card="{card}">
        <card v-show="active && !card.matched"
          :card="card"
          @tapped="cardTapped"
          :style="{transitionDelay: !card.matched ? `${card.delay}ms` : '0ms'}" />
      </template>
    </cards-grid>
    <transition name="fade">
      <div v-show="!active" class="game__btns">
        <button v-show="!done" @click="start">Start</button>
        <button v-show="done" @click="restart">Restart</button>
      </div>
    </transition>
  </div>
</template>
<script>
// data
import cardsData from '~/demodata/cards';
// components
import CardsGrid from '~/components/CardsGrid/CardsGrid';
import Card from '~/components/Card/Card';
export default {
  name: 'Game',
  components: {
    CardsGrid,
    Card,
  },

  data() {
    return {
      cards: this.initCards(cardsData),
      active: false,
      done: false,
      totalFlips: 0,
      flipsThisTurn: 0,
      turnCount: 0,
      firstFlipID: null,
      firstFlipMatchKey: null,
      gameTimer: null,
      startTime: null,
      time: 0,
      tapTimer: null,
      initialState: {
        totalFlips: 0,
        flipsThisTurn: 0,
        turnCount: 0,
        firstFlipID: null,
        firstFlipMatchKey: null,
        gameTimer: null,
        startTime: null,
        time: 0,
        tapTimer: null,
      }
    }
  },

  computed: {
    matchCount() {
      return this.cards.filter(card => card.matched === true).length / 2;
    },
    formattedTime() {
      return this.$store.getters.getFormattedTimer;
    }
  },

  methods: {
    initCards(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].delay = i * 100;
      }
      return _.shuffle(arr);
    },
    updateCards(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].matched = false;
        arr[i].flipped = false;
      }
      return _.shuffle(arr);
    },
    incrementFlipsThisTurn() {
      this.flipsThisTurn ++;
    },
    cardTapped(tappedCardID) {
      const tappedCard = this.cards.find(obj => obj.id === tappedCardID);
      if (tappedCard.flipped) {
        return;
      }
      this.incrementFlipsThisTurn();
      if (this.flipsThisTurn === 1) {
        this.runTurn1(tappedCard);
        this.tapTimer = setTimeout(() => {
          this.flipCard(tappedCard.id);
          this.flipsThisTurn = 0;
        }, 5000);
      }
      if (this.flipsThisTurn === 2) {
        clearTimeout(this.tapTimer);
        this.runTurn2(tappedCard);
      }
    },
    runTurn1(tappedCard) {
      this.flipCard(tappedCard.id);
      this.firstFlipID = tappedCard.id;
      this.firstFlipMatchKey = tappedCard.matchKey;
    },
    runTurn2(tappedCard) {
      this.flipCard(tappedCard.id);
      this.checkMatch(tappedCard);
    },
    checkMatch(tappedCard) {
      setTimeout(() => {
        if (tappedCard.matchKey === this.firstFlipMatchKey) {
          // Match!
          this.flipsThisTurn = 0;
          const newCards = this.cards.map(card => ([tappedCard.id, this.firstFlipID].includes(card.id)) ? { ...card, matched: true } : card );
          this.cards = newCards;
        } else {
          // Not a match
          this.flipCard(tappedCard.id);
          this.flipCard(this.firstFlipID);
          this.flipsThisTurn = 0;
        }
        this.turnCount ++;
      }, 750);
    },
    flipCard(tappedCardID) {
      const newCards = this.cards.map(card => card.id === tappedCardID ? { ...card, flipped: !card.flipped } : card );
      this.cards = newCards;
    },
    startTimer() {
      this.startTime = Date.now();
      this.tick();
    },
    tick() {
      this.gameTimer = setTimeout(() => {
        this.time = Date.now() - this.startTime;
        this.$store.commit('updateTimer', this.time);
        if (this.matchCount === this.cards.length / 2) {
          this.finish();
        } else {
          this.tick();
        }
      }, 1000);
    },
    finish() {
      clearTimeout(this.gameTimer);
      this.active = false;
      this.done = true;
      this.$emit('finish');
    },
    restart() {
      Object.assign(this.$data, this.initialState);
      this.cards = this.updateCards(this.cards);
      this.$store.commit('updateTimer', 0);
      setTimeout(() => this.active = true);
      // start timer after transitions
      setTimeout(() => {
        this.done = false;
        this.startTimer()
      }, 100 * (this.cards.length - 1));
      this.$emit('reset');
    },
    start() {
      Object.assign(this.$data, this.initialState);
      // start timer after transitions
      this.active = true;
      setTimeout(() => {
        this.startTimer()
      }, 100 * (this.cards.length - 1));
      this.$emit('start');
    }
  },
}
</script>

<style src="./Game.styl" lang="stylus"></style>