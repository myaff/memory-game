const animals = [
  "antelope",
  "bear",
  "bull",
  "eagle",
  "elephant",
  "fox",
  "koala",
  "leopard",
  "lion",
  "panda",
  "parrot",
  "rabbit",
  "raccoon",
  "reindeer",
  "rhinoceros",
  "turtle",
  "wolf",
  "zebra"
];

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