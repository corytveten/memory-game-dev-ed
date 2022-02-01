//Grab couple things we need
const section = document.querySelector('section');
let playerLivesCount = document.querySelector('.playerLivesCount');
let playerScore = document.querySelector('.playerScore')
let playerLives = 7;
let playerScoreNum = 0;

//Link text 
playerLivesCount.textContent = playerLives;
playerScore.textContent = playerScoreNum; 

//Generate the data
const getData = () => [
    { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", id: 2, name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
    { imgSrc: "./images/ledzep.jpeg", id: 6, name: "led zeppelin" },
    { imgSrc: "./images/metallica.jpeg", id: 7, name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
    { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", id: 10, name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
    { imgSrc: "./images/ledzep.jpeg", id: 14, name: "led zeppelin" },
    { imgSrc: "./images/metallica.jpeg", id: 15, name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
    cardData.forEach(item => {
        const card = document.createElement("div");
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name)
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard')
            checkCards(e)
        })
    })
};

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped')
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard")
    console.log(flippedCards, flippedCards.length)
    console.log(clickedCard)
    //logic
    if (flippedCards.length === 2) {
        if (
            flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute("name")
            ) {
                console.log("match")
                playerScoreNum += 100;
                playerScore.textContent = playerScoreNum;
                flippedCards.forEach(card => {
                    card.classList.remove('flipped');
                    card.style.pointerEvents = 'none'
                })
            } else {
                console.log("wrong");
                flippedCards.forEach(card => {
                    card.classList.remove('flipped')
                    setTimeout(() => card.classList.remove('toggleCard'), 1000)
                })
                playerLives--;
                playerLivesCount.textContent = playerLives;
                if (playerLives === 0) {
                    restart("Try Again");
                }
            }
    }
    if(toggleCard.length === 16){
        setTimeout(() => {
            restart("You Win!")

        }, 1000)
    }
    
}

//restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        //Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000)

    });
    playerLives = 7;
    playerLivesCount.textContent = playerLives;
    playerScoreNum = 00;
    playerScore.textContent = playerScoreNum;
    setTimeout(() => window.alert(text), 1000)
}

cardGenerator()
