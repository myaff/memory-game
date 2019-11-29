<template>
  <div class="game">
    <div class="game__main">
      <div class="game__timer">{{ formattedTime }}</div>
      <cards-grid :cards="cards" class="game__cards">
        <template v-slot:card="{card}">
          <card v-show="active && !card.matched"
            :card="card"
            @tapped="cardTapped"
            :style="{transitionDelay: !card.matched ? `${card.delay}ms` : '0ms'}" />
        </template>
      </cards-grid>
      <div v-show="!active" class="game__btns">
        <button v-show="!done" @click="start">Start</button>
        <button v-show="done" @click="reset">Reset</button>
      </div>
    </div>
    <div class="game__aside">Rating</div>
  </div>
</template>

<script>
// data
import cardsData from '~/demodata/cards';
// components
import CardsGrid from '~/components/CardsGrid/CardsGrid';
import Card from '~/components/Card/Card';
export default {
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
      score: [],
      cardTransform: null,
      globalTimerID: null,
      startTime: null,
      timer: 0,
      operativeTimerID: null,
      initialState: {
        totalFlips: 0,
        flipsThisTurn: 0,
        turnCount: 0,
        firstFlipID: null,
        firstFlipMatchKey: null,
        score: [],
        cardTransform: null,
        globalTimer: null,
        operativeTimer: null
      }
    }
  },

  computed: {
    matchCount() {
      return this.cards.filter(card => card.matched === true).length / 2;
    },
    formattedTime() {
      let seconds = Math.floor((this.timer / 1000) % 60),
      minutes = Math.floor((this.timer / (1000 * 60)) % 60),
      hours = Math.floor((this.timer / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    }
  },

  methods: {
    shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
    initCards(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].delay = i * 100;
      }
      return this.shuffle(arr);
    },
    updateCards(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].matched = false;
        arr[i].flipped = false;
      }
      return this.shuffle(arr);
    },
    incrementFlipsThisTurn() {
      this.flipsThisTurn ++;
    },
    cardTapped(tappedCardID) {
      // store a copy of the card data as tappedCard
      const tappedCard = this.cards.find(obj => obj.id === tappedCardID);
      if (tappedCard.flipped) {
        return;
      }
      // Increment flip count for this turn
      this.incrementFlipsThisTurn();
      if (this.flipsThisTurn === 1) {
        this.runTurn1(tappedCard);
        this.operativeTimerID = setTimeout(() => {
          this.flipCard(tappedCard.id);
          this.flipsThisTurn = 0;
        }, 5000);
      }
      if (this.flipsThisTurn === 2) {
        clearTimeout(this.operativeTimerID);
        this.runTurn2(tappedCard);
      }
    },
    runTurn1(tappedCard) {
      // flip the card face up
      this.flipCard(tappedCard.id);
      // store ID and Matchkey of first flipped card
      this.firstFlipID = tappedCard.id;
      this.firstFlipMatchKey = tappedCard.matchKey;
    },
    runTurn2(tappedCard) {
      // flip the card face up
      this.flipCard(tappedCard.id);
      this.checkMatch(tappedCard);
    },
    checkMatch(tappedCard) {
      // check match
      setTimeout(() => {
        if (tappedCard.matchKey === this.firstFlipMatchKey) {
          // Match!
          // reset flips counter
          this.flipsThisTurn = 0;
          // update the 2 cards 'matched' prop
          const newCards = this.cards.map(card => ([tappedCard.id, this.firstFlipID].includes(card.id)) ? { ...card, matched: true } : card );
          this.cards = newCards;
          // update score
          this.score.push('match');
        } else {
          // Not a match
          // Turn both cards back face down
          this.flipCard(tappedCard.id);
          this.flipCard(this.firstFlipID);
          this.flipsThisTurn = 0;
          // update the score
          this.score.push('miss');
        }
        // increment turn count
        this.turnCount ++;
      }, 1000);
    },
    flipCard(tappedCardID) {
      const newCards = this.cards.map(card => card.id === tappedCardID ? { ...card, flipped: !card.flipped } : card );
      // update cards
      this.cards = newCards;
    },
    startTimer() {
      this.startTime = Date.now();
      this.tick();
    },
    tick() {
      this.globalTimerID = setTimeout(() => {
        this.timer = Date.now() - this.startTime;
        if (this.matchCount === this.cards.length / 2) {
          this.finish();
        } else {
          this.tick();
        }
      }, 1000);
    },
    finish() {
      clearTimeout(this.globalTimerID);
      this.active = false;
    },
    reset() {
      Object.assign(this.$data, this.initialState);
      this.cards = this.updateCards(this.cards);
      this.active = true;
    },
    start() {
      Object.assign(this.$data, this.initialState);
      this.active = true;
      this.done = true;
      this.startTimer();
    }
  }
}
</script>

<style src="~/assets/stylus/pages/game.styl" lang="stylus"></style>