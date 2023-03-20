//P1 Numbers

//1
let baseURL = 'http://numbersapi.com';
let favoriteNumber = 11;

async function getNumberInfo() {
  let res = await axios.get(`${baseURL}/${favoriteNumber}?json`);
  console.log(res);
}
getNumberInfo()

//2
let favoriteNumbers = [11, 33, 44];

async function getNumbersInfo() {
  let res = await axios.get(`${baseURL}/${favoriteNumbers}?json`);
  console.log(res);
}
getNumbersInfo()

//3
async function getFourFacts() {
  let res = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favoriteNumber}?json`))
  );
  res.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
getFourFacts()

//P2 Cards

//1
let deckURL = 'https://deckofcardsapi.com/api/deck'

async function getCard() {
  let card = await $.getJSON(`${deckURL}/new/draw/?count=1`);
  let {value, suit} = card.cards[0];
  console.log(`${value} of ${suit}`);
}


//2
async function get2Cards() {
  let firstCard = await $.getJSON(`${deckURL}/new/draw/`);
  let deckId = firstCard.deck_id;
  let secondCard = await  $.getJSON(`${deckURL}/${deckId}/draw/`);
  [firstCard, secondCard].forEach(card => {
    let {value, suit} = card.cards[0];
    console.log(`${value} of ${suit}`);
  })
}

//3
async function fullDeck() {
  let $btn = $('button');
  let $cardArea = $('#card-area')

  let deck = await $.getJSON(`${deckURL}/new/shuffle/`);
  $btn.show().on('click', async function() {
    let card = await $.getJSON(`${deckURL}/${deck.deck_id}/draw/`)
    let img = card.cards[0].image;
    $cardArea.append($(`<img src='${img}' style='position: absolute'>`));
    if (card.remaining === 0) {
      $btn.remove();
    }
  });
}
fullDeck();