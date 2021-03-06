import animals from '~/demodata/animals';

const cards = [];

animals.forEach(item => {
  const card = {
    matchKey: item,
    flipped: false,
    id: `${item}-a`,
    icon: item,
    matched: false,
  }
  // first copy
  const cardA = card;
  cards.push(cardA);
  // second copy
  const cardB = { ...card };
  cardB.id = `${item}-b`;
  cards.push(cardB);
});

export default cards;