//import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const bodyOptions__website = document.querySelector('.options-body');
const optionsRow = document.querySelector('.options__row');
const option = document.getElementsByClassName('options__option');
const optionPhoto = document.getElementsByClassName('options__photo');
const continueButton = document.querySelector('.continue');
const mainContent = document.querySelector('.content__main');
const return__mainPageButton = document.querySelector('.return__main-page');
const battle = document.querySelector('.battle');
const battleItem = document.querySelectorAll('.battle__item');
const battleItems = document.querySelector('.battle__items');
const radioButtons = document.getElementsByName('radio');
const explosion = document.querySelector('.explosion');
const boom = document.querySelector('.boom');
const endGame = document.querySelector('.end-game');

const boughtItems__parent = document.querySelector('.bought-items');
//!bought-items__active in order the element would show up

const boughtItems__children = document.querySelectorAll('.bought-item');

let data = JSON.parse(localStorage.getItem('piesAmount')) ||
[
    {
        "piesRecieved__perGame": 1
    },
    {
        "totalPiesAmount": 0
    },
    {
        "piesRecieved__perGame_saved": 1
    }
];

let casesCountsData = JSON.parse(localStorage.getItem('casesCounts')) || [
    [0, 0, 0]
];
//[0(ties), 0(loses) , 0(victories)]

let streaksCountData = JSON.parse(localStorage.getItem("streaksCount")) || [
    {"streakCount": 0}
];
let streakAmountTrigger = 3;

let amountOfBoughtItems = JSON.parse(localStorage.getItem("amountOfBoughtItems")) ||
[
    {
        "amount": 0,
        "image": `<div class="circle"><div class="circle__content"><p>X2</p></div></div>`
    },

    { 
    "amount": 0,
    "image": `/imgs/pie-store/imgs/02.jpg`
    },

    { 
        "amount": 0,
    "image": `/imgs/pie-store/imgs/01.jpg`
},
];

let imageItems__usedAmount = JSON.parse(localStorage.getItem("imageItems__usedAmount")) ||
[0];

let rangeSet = 50;
let range = JSON.parse(localStorage.getItem("range")) || [rangeSet];

function loadOptionsWebsite(event){
    setTimeout(()=>{
        bodyOptions__website.classList.add('load-options-website');
    }, 1000)

}
window.addEventListener("load", loadOptionsWebsite);


new Swiper('.swiper', {
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        // Optional parameters
        direction: 'horizontal',
        loop: true,    
        slidesPerView: 'auto',
    },);
    
let areItemsBought = amountOfBoughtItems.filter((amount__object) =>{
    return amount__object["amount"] > 0
})
console.log(areItemsBought);

let imageItems = areItemsBought.filter(item =>{
    return /^\/imgs/.test(item["image"]);
})
console.log(imageItems);


function renderImageItems(item, id = 3){
    const newOption = document.createElement("div");
    newOption.classList.add("options__option");
    newOption.classList.add("swiper-slide");
    newOption.classList.add("dynamic");
    optionsRow.appendChild(newOption);

    const options__itemAmount = document.createElement('div');
    options__itemAmount.classList.add("options__item-amount");
    newOption.prepend(options__itemAmount);

    const options__itemAmount_p = document.createElement('p');
    options__itemAmount.appendChild(options__itemAmount_p);
    
    if(item["amount"] >= 100){
        options__itemAmount.style.fontSize = '1.25rem';
    }

    if(item["amount"] <= 999){
        options__itemAmount_p.textContent = item["amount"];
    }else{
        options__itemAmount_p.textContent = '999+';
    }

    const newInput = document.createElement("input");
    newInput.type = 'radio';
    newInput.name = 'radio';
    newInput.id = id;
    id++;
    newOption.prepend(newInput);
    
    const newPhoto = document.createElement("div");
    newPhoto.classList.add("options__photo");
    newOption.appendChild(newPhoto);
    
    const newImage = document.createElement("img");
    newImage.src = item["image"];
    newImage.dataset.src = item["image"];
    newImage.alt = 'options__photo';
    newPhoto.appendChild(newImage);
}

if(option.length){
    Array.from(option).forEach((option, index) =>{
        option.setAttribute('id', index)
    })
}else{
    console.error('No items found');
}
//Check if there are any image items;
//if so, then add the image items bought by user and a slider!

if(imageItems.length > 0){
    new Swiper('.swiper',{
        
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        
        // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
                slidesPerView: 'auto',
                freeMode: true,
            });
            imageItems.forEach((item, id = 3)=>{
                renderImageItems(item, id)
            })
        }

        const optionsWithId = document.querySelectorAll('div.options__option[id]');
        const filteredOptionsWithId = [...optionsWithId].filter(filtered =>{
            let items = !isNaN(parseInt(filtered));
            return items;
})


console.log(option.length);
console.log(optionsWithId);
console.log(filteredOptionsWithId);

let userItem__radio;
let enemyItem__INDEX;
function renderFighingItems(){
    userItem__radio = [...radioButtons].filter(radio =>{
        if(window.getComputedStyle(radio, "before").backgroundColor === "rgb(102, 102, 102)"){
            radio.parentElement.classList.add("checked");
            radio.classList.add("input__checked");
            return radio;
        }
        radio.classList.remove("input__checked");
        radio.parentElement.classList.remove("checked")
    })
    let enemyIndex__RANGE = user__INDEXES.length - imageItems.length
    
    
    let targetNum = Math.floor(Math.random() * Number(range)) + 1
    
    console.log(targetNum === Number(range));
    console.log(Number(range));

    if(imageItems.length > 0){
        if(targetNum === Number(range) && Number(imageItems__usedAmount) > 0){
            enemyItem__INDEX = Math.floor(Math.random() * user__INDEXES.length)
        }else{
            enemyItem__INDEX = Math.floor(Math.random() * enemyIndex__RANGE);
        }
    }else{
        enemyItem__INDEX = Math.floor(Math.random() * user__INDEXES.length);
    }
    console.log(enemyItem__INDEX);
}
let user__INDEXES = [];
Array.from(radioButtons).forEach((radio, index) => {
    user__INDEXES.push(index);
    radio.setAttribute('id', index);
});

console.log(user__INDEXES);


const userItem = document.getElementsByClassName('checked');
const userItem__INPUT = document.getElementsByClassName('input__checked')

optionsRow.addEventListener("click",(e)=>{
    let tragetElem = e.target.closest('.options__option');
    if(tragetElem){
        continueButton.classList.add('show-continue');
        renderFighingItems();
        console.log(userItem__INPUT[0].id);
    }
})


return__mainPageButton.addEventListener("click", ()=>{
    location.href = "/index.html";
})

let userAndEnemy__INDEXES = [];



function renderBoughItem(itemsParent, bought__item, storeItem, index){
    bought__item = document.createElement("a");
    bought__item.setAttribute("href", '#')
    bought__item.classList.add("bought-item");
    itemsParent.append(bought__item);
    const boughtItem__image = document.createElement("div");
    boughtItem__image.classList.add("bought-item__image");
    bought__item.prepend(boughtItem__image);
    const remaining = document.createElement("div");
    remaining.classList.add("remaining");
    remaining.classList.add("bought-item__remaining")
    bought__item.appendChild(remaining);
    const remaining__text = document.createElement("p");
    remaining.appendChild(remaining__text);
    
    boughtItem__image.insertAdjacentHTML("afterbegin",
    storeItem['image'])
    remaining__text.textContent = `${formatNumber(areItemsBought[index]['amount'])} remaining`;
}

let boughtItem;
function displayBoughtItems(itemsParent, itemsArr){
    if(areItemsBought.length !== 0){
        itemsParent.classList.add("bought-items__active");

        areItemsBought.forEach((bought__item, index) =>{
            if(/^<div/.test(bought__item['image'])){
                renderBoughItem(boughtItems__parent, boughtItem, bought__item, index);
            }else{
                    console.error(`There weren't found any non-image elements!`);
                    return;
                }
            })
            Array.from(itemsArr).forEach(item =>{
                item.classList.add("boght-items__active");
            })
            boughtItem = document.querySelector('.bought-item')
    }else{
        return;
    }
}

const newStaticCollection = document.querySelectorAll('.options__option');
console.log(newStaticCollection);

const option__transitionTime = 2000;
let userBattleItem = battleItem[0].children[0];
let enemyBattleItem = battleItem[1].children[0];


function doesUserHaveAnImageItem(battleItem){
    return /\/pie-store\/imgs\/\S{1,}\.jpg$/gm.test(battleItem.src);
}

continueButton.addEventListener("click", function(event){
    console.log(userItem[0].lastElementChild.children[0].src);
    console.log(newStaticCollection[enemyItem__INDEX].lastElementChild.children[0].src);
    mainContent.style.display = `none`;
    battle.style.display = `block`;
    
    userBattleItem.src = userItem[0].lastElementChild.children[0].src
    enemyBattleItem.src = newStaticCollection[enemyItem__INDEX].lastElementChild.children[0].src;
    battleItems.classList.add('fighting-animation');
    
    userAndEnemy__INDEXES.push(parseInt(userItem__INPUT[0].id), enemyItem__INDEX);
    console.log(userAndEnemy__INDEXES);
    
    checkWhoWins();
    
    if(doesUserHaveAnImageItem(userBattleItem)){
        imageItems__usedAmount = Number(imageItems__usedAmount) + 1;
        range = Number(range) - 2;
        if(Number(range) === 0){
            range = [rangeSet];
            imageItems__usedAmount = [0];
        }
    }else{
        imageItems__usedAmount = Number(imageItems__usedAmount);
    }

    localStorage.setItem("imageItems__usedAmount", JSON.stringify(imageItems__usedAmount));
    localStorage.setItem("range", JSON.stringify(range));
    console.log(imageItems__usedAmount);
    console.log(userItem[0]); 
    if(userAndEnemy__INDEXES[0] >= 3){
        amountOfBoughtItems[userAndEnemy__INDEXES[0] - 2]["amount"] -= 1;
    }
    localStorage.setItem("amountOfBoughtItems", JSON.stringify(amountOfBoughtItems));
    setTimeout(()=>{
        battle.style.display = `none`;
        explosion.style.display = `block`;
        explosion.style.position = `absolute`;
        explosion.style.opacity = 1;
        boom.classList.add("show_boom");
    }, option__transitionTime);
    
    setTimeout(()=>{
        explosion.style.opacity = 0;
        explosion.style.display = `none`;
        endGame.classList.add("end-game_flex")
        battle__conclution.classList.add('poped__up');
        inspirational_quote.classList.add('poped__up');
        console.log(`The total user's amount of pies: ${data[1].totalPiesAmount}`);
        console.log(data);
        console.log(`The user's streak is: ${streaksCountData[0].streakCount}`);
        console.log(streak__amount);
        explosion.style.position = `relative`;
    
        if(data[0].piesRecieved__perGame > 0){
            displayBoughtItems(boughtItems__parent, boughtItems__children);
            document.querySelector('.bought-item')?.addEventListener("click", itemFunctionality)
        }else{
            boughtItem?.removeEventListener("click", itemFunctionality)
        }
    }, option__transitionTime + 1250)
})

//! END GAME

const wrapper = document.querySelector('.wrapper');
const fireLava = document.querySelector('.fire-lava');
const battle__conclution = document.querySelector('.battle__conclution');
const inspirational_quote = document.querySelector('.inspirational-quote');
const piesElement = document.querySelector('.pies');
const streakElement = document.querySelector('.streak');
const piesAmount = document.querySelector('.pies__amount');
const streak__amount = document.querySelector('.streak__amount p');



const pies__amount_child_p = piesAmount.childNodes[1];
const pies__amount_child_span = pies__amount_child_p.childNodes[1];

fireLava.classList.add("fire-lava__risen");
document.body.classList.add("battle__conclution-inspirational-quote_fade-down")
wrapper.classList.add("battle__conclution-inspirational-quote_fade-down");

const inspirational_quote__child = inspirational_quote.childNodes[1];
const alternativeQuotes = [
    {
        "positiveQuotes": [
            "Victory is sweetest when you've known defeat.",
            "Victory belongs to the most persevering.",
            "In the midst of chaos, there is also opportunity.",
            "The harder the battle, the sweeter the victory.",
            "He who fears being conquered is sure of defeat.",
            "It is better to conquer yourself than to win a thousand battles.",
            "The greatest victory is that which requires no battle.",
            "It's not whether you get knocked down; it's whether you get up.",
            "Victory has a thousand fathers, but defeat is an orphan.",
            "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win."
    ],
    "authors":[
        "Malcolm S. Forbes",
        "Napoleon Bonaparte",
        "Sun Tzu",
        "Les Brown",
        "Napoleon Bonaparte",
        "Buddha",
        "Sun Tzu",
        "Vince Lombardi",
        "John F. Kennedy",
        "Sun Tzu"
    ]
    },
    {
        "negativeQuotes": [
            "The harder the struggle, the more glorious the triumph. Self-realization demands very great struggle.",
            "Every loss leaves a room for a better thing to enter.",
            "Losing is not a disgrace, if you have given your best.",
            "Success is not forever and failure is not fatal.",
            "Failure is simply an opportunity to begin again, this time more intelligently.",
            "In the hopes of reaching the moon, men fail to see the flowers that blossom at their feet.",
            "Our strength grows out of our struggles.",
            "Fall seven times, stand up eight.",
            "Life's real failure is when you do not realize how close you were to success when you gave up.",
            "The phoenix must burn to emerge."
        ],
        "authors":[
            "Swami Sivananda",
            "Unknown",
            "Fernando Montes de Oca",
            "Lalu Prasad Yadav",
            "Henry Ford",
            "Albert Schweitzer",
            "Ralph Waldo Emerson",
            "Japanese Proverb",
            "Unknown",
            "Janet Fitch"
        ]
    },
    {
        "allTheQuotes":[
            "Victory is sweetest when you've known defeat.",
            "Victory belongs to the most persevering.",
            "In the midst of chaos, there is also opportunity.",
            "The harder the battle, the sweeter the victory.",
            "He who fears being conquered is sure of defeat.",
            "It is better to conquer yourself than to win a thousand battles.",
            "The greatest victory is that which requires no battle.",
            "It's not whether you get knocked down; it's whether you get up.",
            "Victory has a thousand fathers, but defeat is an orphan.",
            "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.",
            "The harder the struggle, the more glorious the triumph. Self-realization demands very great struggle.",
            "Every loss leaves a room for a better thing to enter.",
            "Losing is not a disgrace, if you have given your best.",
            "Success is not forever and failure is not fatal.",
            "Failure is simply an opportunity to begin again, this time more intelligently.",
            "In the hopes of reaching the moon, men fail to see the flowers that blossom at their feet.",
            "Our strength grows out of our struggles.",
            "Fall seven times, stand up eight.",
            "Life's real failure is when you do not realize how close you were to success when you gave up.",
            "The phoenix must burn to emerge."
        ],
        "authors":[
            "Malcolm S. Forbes",
            "Napoleon Bonaparte",
            "Sun Tzu",
            "Les Brown",
            "Napoleon Bonaparte",
            "Buddha",
            "Sun Tzu",
            "Vince Lombardi",
            "John F. Kennedy",
            "Sun Tzu",
            "Swami Sivananda",
            "Unknown",
            "Fernando Montes de Oca",
            "Lalu Prasad Yadav",
            "Henry Ford",
            "Albert Schweitzer",
            "Ralph Waldo Emerson",
            "Japanese Proverb",
            "Unknown",
            "Janet Fitch"
        ]
    }
];
const quotes = new XMLHttpRequest() ? new XMLHttpRequest() : alternativeQuotes;
quotes.open("GET", '/json/quotes.json');
quotes.send();



let realQuotes;



let generatedQuote;
let citation;
let pickedQuoteIndex = Math.floor(Math.random() * 20);
let pickedQuoteIndex__VictoryAndLoss = Math.floor(Math.random() * 10);


function createTieArr(start = 0, end){
    let tieArr = [];
    for(let first = start; first < end + 1; first++){
        tieArr.push([first, first])
    }
    tieArr
    return tieArr;
}
function createLossArr(start = 0, end){
    let lossArr = [];
    for(let first = start; first < end; first++){
        lossArr.push([first, first + 1])
    }
    //Create an expection of the rule which is: 
    //scissors and rock
    lossArr.push([2,0]);

    //Create exceptions for the image bought items
    
    if(imageItems.length > 0){
        let id = 3;
        imageItems.forEach((item) =>{
            for (let i = 0; i < user__INDEXES.length; i++) {
                lossArr.push([i, id])
            }
            id++;
         })
    }

    return lossArr;
}
function createVictoryArr(start = 0, end){
    let victoryArr = [];
    for(let first = start; first < end; first++){
        victoryArr.push([first + 1, first])
    }
    //Create an expection of the rule which is: 
    //rock and scissors
    victoryArr.push([0,2]);
    
    
    //Create exceptions for the image bought items
    if(imageItems.length > 0){
        let id = 3;
        imageItems.forEach((item) =>{
            for (let i = 0; i < user__INDEXES.length - imageItems.length; i++) {
                victoryArr.push([id, i])
            }
            id++;
        })
        }
    return victoryArr;
}




const tieCases = createTieArr(0,2);
console.log(tieCases);

const lossCases = createLossArr(0,3);
console.log(lossCases);

const victoryCases = createVictoryArr(0,3);
console.log(victoryCases);

realQuotes = alternativeQuotes;
quotes.onload = ()=>{
        realQuotes = alternativeQuotes;

    console.log(quotes);
}

quotes.onerror = ()=>{
    alert(`OOPS! WE COULD NOT LOAD THE QUOTES :(`);
    inspirational_quote__child.innerHTML = `OOPS! WE COULD NOT LOAD THE QUOTES :(`
}





function checkForHavingStreaks(){
    if(streaksCountData[0].streakCount === 0){
        streakElement.classList.add("diactivated");
        piesElement.classList.add("center");
    }else{
        streakElement.classList.remove("diactivated");
        piesElement.classList.remove("center");
    }
}

function formatNumber(num){
    if(num >= 1000){
        const units = ['', 'K', 'M', 'B', 'T', 'Qd.', 'Qt.', 'Sex.', 'Spt.', 'Oct.', 'Non.'];
        const unit = Math.floor(Math.log10(Math.abs(num)) / 3);
        const value = (num / Math.pow(1000, unit)).toFixed(2);
        return value + units[unit];
    }else{
        return num;
    }
}

function tie(){
    streaksCountData[0].streakCount = streaksCountData[0].streakCount;
    data[0].piesRecieved__perGame = 0;
    data[1].totalPiesAmount += data[0].piesRecieved__perGame;
    casesCountsData[0][0]+=1;
    
    generatedQuote = realQuotes[2].allTheQuotes[pickedQuoteIndex];
    citation = realQuotes[2].authors[pickedQuoteIndex];
    piesAmount.classList.add("tie-set_color");
    battle__conclution.childNodes[1].innerHTML = "TIE!"
    battle__conclution.classList.add("tie-set_color");
    inspirational_quote__child.classList.add("tie-set_color");
    inspirational_quote__child.innerHTML = `"${generatedQuote}" - <i class="bold">${citation}</i>.`;
        
        pies__amount_child_p.textContent = formatNumber(Number(data[0].piesRecieved__perGame));
        streak__amount.textContent = streaksCountData[0].streakCount;
    }

    function loss(){
        data[0].piesRecieved__perGame = -1;
        if(enemyItem__INDEX >= 3 && data[1].totalPiesAmount > 0){
            switch (true) {
                case data[1].totalPiesAmount > 100:
                    pies__amount_child_p.textContent =  formatNumber(Math.floor(-data[1].totalPiesAmount * 0.1))
                    data[1].totalPiesAmount = Math.ceil(data[1].totalPiesAmount * 0.9)
                    break;
            
                case data[1].totalPiesAmount <= 100:
                    pies__amount_child_p.textContent = formatNumber(Math.floor(-data[1].totalPiesAmount * (1 / 3)))
                    data[1].totalPiesAmount = Math.ceil(data[1].totalPiesAmount * (2 / 3))
                    break;
            }
            }
            else{
                pies__amount_child_p.textContent = formatNumber(Number(data[0].piesRecieved__perGame));
            }
            if(data[1].totalPiesAmount === 0){
                data[0].piesRecieved__perGame = 0;
                pies__amount_child_p.textContent = formatNumber(Number(data[0].piesRecieved__perGame));
            }
            data[2].piesRecieved__perGame_saved = 1;
            
        data[1].totalPiesAmount += data[0].piesRecieved__perGame;
        casesCountsData[0][1]+=1;
        if(enemyItem__INDEX >= 3){
            range = [rangeSet];
            imageItems__usedAmount = [0];
        }
        streaksCountData[0].streakCount = 0;
        
    let negativeQuotes__length = realQuotes[1].negativeQuotes.length;
    generatedQuote = realQuotes[1].negativeQuotes[pickedQuoteIndex__VictoryAndLoss];
    citation = realQuotes[1].authors[pickedQuoteIndex__VictoryAndLoss];    
    piesAmount.classList.add("loss-set_color");
    battle__conclution.childNodes[1].innerHTML = "YOU LOST THE BATTLE!"
    battle__conclution.classList.add("loss-set_color");
    inspirational_quote__child.classList.add("loss-set_color");
    inspirational_quote__child.innerHTML = `"${generatedQuote}" - <i class="bold">${citation}</i>.`;
    streak__amount.textContent = streaksCountData[0].streakCount;
}
function victory(){
    streaksCountData[0].streakCount+=1;
    if(streaksCountData[0].streakCount % streakAmountTrigger === 0){
        data[2].piesRecieved__perGame_saved += 1;
        data[0].piesRecieved__perGame = data[2].piesRecieved__perGame_saved; //data[2].piesRecieved__perGame_saved
        localStorage.setItem("piesAmount", JSON.stringify(data))
    }
    if(data[0].piesRecieved__perGame === 0){
        data[0].piesRecieved__perGame += data[2].piesRecieved__perGame_saved;
    }else if(data[0].piesRecieved__perGame === -1){
        data[2].piesRecieved__perGame_saved = 1;
        data[0].piesRecieved__perGame = 1;
    }
    data[1].totalPiesAmount += data[0].piesRecieved__perGame;
    casesCountsData[0][2]+=1;

    let positiveQuotes__length = realQuotes[0].positiveQuotes.length;
    generatedQuote = realQuotes[0].positiveQuotes[pickedQuoteIndex__VictoryAndLoss];
    citation = realQuotes[0].authors[pickedQuoteIndex__VictoryAndLoss];    
    
        piesAmount.classList.add("victory-set_color");
        battle__conclution.childNodes[1].innerHTML = "YOU WON THE BATTLE!"
        battle__conclution.classList.add("battle__conclution_victory-set")
        inspirational_quote__child.innerHTML = `"${generatedQuote}" - <i class="bold">${citation}</i>.`;
        pies__amount_child_p.textContent = `+${formatNumber(Number(data[0].piesRecieved__perGame))}`;
        streak__amount.textContent = streaksCountData[0].streakCount;
    }
    
    
    const sentData = localStorage.setItem("piesAmount", JSON.stringify(data));
    
    function importAllLocalStorageData(){
        localStorage.setItem("piesAmount", JSON.stringify(data));
        localStorage.setItem("casesCounts", JSON.stringify(casesCountsData));
        localStorage.setItem("streaksCount", JSON.stringify(streaksCountData))
    }
    
    function checkForTie(){
        tieLoop: for (let i = 0; i < tieCases.length; i++) {
            if(Number([...userAndEnemy__INDEXES].join('')) == Number(tieCases[i].join(''))){
                tie();
            break tieLoop;
        }
    }
    importAllLocalStorageData();
}

function checkForLoss(){
    lossLoop: for (let i = 0; i < lossCases.length; i++) {
        if(Number([...userAndEnemy__INDEXES].join('')) == Number(lossCases[i].join(''))){
            loss();
            break lossLoop;
        }
    }
    importAllLocalStorageData();
}
function checkForVictory(){
    victoryLoop: for (let i = 0; i < victoryCases.length; i++) {
        if(Number([...userAndEnemy__INDEXES].join('')) == Number(victoryCases[i].join(''))){
            victory();
            break victoryLoop;
        }
    }
    importAllLocalStorageData();
}

function checkWhoWins(){
    checkForTie();
    checkForLoss();
    checkForVictory();
    checkForHavingStreaks();
}


//!CREATING THE BOUGHT ITEMS' FUNCTIONALITY

function itemFunctionality(event) {
    const itemRemaining = boughtItem.querySelector('.bought-item__remaining');
    const targetItem = event.target.closest('.bought-item');
    console.log(targetItem);
    if(targetItem){
        const boughtItem__remaining = document.querySelectorAll('.bought-item__remaining');
        Array.from(boughtItem__remaining).forEach(item => {
            item.classList.remove("not-enough");
            item.classList.add("bought-item__remaining");
        });
        data[1].totalPiesAmount += data[0].piesRecieved__perGame * 1;
        pies__amount_child_p.textContent =  `+${data[0].piesRecieved__perGame * 2}`;
        amountOfBoughtItems[0]["amount"] = areItemsBought[0]["amount"]-=1;
        
        itemRemaining.textContent = `${formatNumber(Number(amountOfBoughtItems[0]["amount"]))} remaining`;
        if(amountOfBoughtItems[0]["amount"] === 0){
        boughtItem.remove();
        boughtItem.classList.remove("hover");
    }
    boughtItem?.removeEventListener("click", itemFunctionality)
    Array.from(boughtItem__remaining).forEach(item => {
        item.classList.remove("bought-item__remaining");
        item.classList.add("not-enough");
    });
    }else{
        return;
    }
    localStorage.setItem("piesAmount", JSON.stringify(data))
    localStorage.setItem("amountOfBoughtItems", JSON.stringify(amountOfBoughtItems))
}