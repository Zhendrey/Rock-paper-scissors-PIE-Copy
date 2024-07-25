//import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const pieStore__body = document.querySelector('.pieStore__body');
const wrapper = document.querySelector('.wrapper');
const header = document.querySelector('.header');
const header__navbar = document.querySelector('.header__navbar');
const howMuchPies__help = document.querySelector('.how-much-pies__help');
const cards__wrapper = document.querySelector('.cards__wrapper');
const cards__row = document.querySelector('.cards__row');
const card = document.querySelectorAll('.card');
const card__name = document.querySelectorAll('.card__name p');
const cardImage = document.querySelectorAll('.card__image>*')
const cardIcon = document.querySelectorAll('.card__icon');
const cardBuy = document.querySelectorAll('.card__buy');
const cardRemaining = document.querySelectorAll('.card__remaining p');
const cardFront = document.querySelectorAll('.card__front');
const cardBack = document.querySelectorAll('.card__back');
const cardBack_close = document.querySelector('.card__back-close');
const douleCheck = document.querySelector('.double-check');
const doubleCheck__selectedItem = document.querySelector('.double-check__selected-item');
const doubleCheck__text = document.querySelector('.double-check__text p');
const doubleCheck__disagree = document.querySelector('.double-check__disagree');
const doubleCheck__agree = document.querySelector('.double-check__agree');
const forestTree = document.querySelectorAll('.forest-tree');
const allPrices = document.querySelectorAll('.pies-amount p');
const prices = Array.from(allPrices).slice(1,allPrices.length);
const pricesValues = Array.from(prices).map(price =>{
    return +price.textContent;
})

const cardNames = Array.from(card__name).map(cardName =>{
    return cardName.textContent
})
console.log(cardNames);
const howMuchPies = document.querySelector('.how-much-pies');
const piesAmount = document.querySelector('.pies-amount');
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
let casesCountsData = JSON.parse(localStorage.getItem("casesCounts")) || 
[
    [0, 0, 0]
];
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

new Swiper('.swiper',{
    
    // Optional parameters
    direction: 'horizontal',
    loop: true,    
    //If we need pagination
        pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },  
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    /*keyboard: {
        enabled: true,
        onlyInViewport: false,
        },*/
    slidesPerView: 'auto',
    freeMode: true,
});

const swiperClasses = document.querySelectorAll('.cards [class^="swiper"]');


function addInteractionsAmount(interactedCases){
    let amountOfCases = casesCountsData[0];
    interactedCases = amountOfCases.filter(caseElem => {
        return caseElem !== 0
    });
    return interactedCases;
}

let interactions;

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

function pieStore__load(){
    pieStore__body.classList.add("active__main");
    for(let i = 0; i < forestTree.length; i++){
        forestTree[i].style.transform = `translateX(0px)`;
    }
    interactions = addInteractionsAmount(interactions);
        if(interactions.length !== 0){
            howMuchPies.classList.add("active-visible");
            piesAmount.textContent = formatNumber(Number(data[1].totalPiesAmount));
        
        }
        if(data[1].totalPiesAmount >= 1000){
            howMuchPies__help.classList.add("active-flex");
            howMuchPies__help.addEventListener("click", showFullAmount);
        }
}

function showFullAmount(event){
    piesAmount.classList.toggle("full-amount");
    if(document.querySelector('.full-amount') !== null){
        howMuchPies__help.textContent = '9.99k'
        piesAmount.textContent = data[1].totalPiesAmount;
    }else{
        howMuchPies__help.textContent = '999...'
        piesAmount.textContent = formatNumber(Number(data[1].totalPiesAmount));
    }
}
window.addEventListener("load", pieStore__load);


for(let i = 0; i < cardFront.length; i++){
    cardFront[i].addEventListener("click", function(e){
        if(e.target.closest('.card__icon')){
            card[i].classList.add("card__removed");
            cardFront[i].classList.add("card__removed");
            cardBack[i].classList.add("card__appeared");
        }
    })
}
for(let i = 0; i < cardBack.length; i++){
    cardBack[i].addEventListener("click", function(e){
        if(e.target.closest('.card__back-close')){
            card[i].classList.remove("card__removed");
            cardFront[i].classList.remove("card__removed");
            cardBack[i].classList.remove("card__appeared");
        }
    })
}


const selectedItem__img = document.createElement('img');

function addFocusToDoubleCheck(){
    douleCheck.classList.add("double-check__active");
    cards__wrapper.classList.add("cards__wrapper_active")
    if(cardImage[pickedCard__id].getElementsByTagName('div').length != 0){
        doubleCheck__selectedItem.insertAdjacentHTML(
            "afterbegin",
            amountOfBoughtItems[pickedCard__id][Object.keys(amountOfBoughtItems[pickedCard__id])[1]]
        )
    }else{
        selectedItem__img.src = `${
            amountOfBoughtItems[pickedCard__id]['image']
        }`;
        selectedItem__img.alt = 'Selected item'
        doubleCheck__selectedItem.prepend(selectedItem__img)
    }
    doubleCheck__text.textContent = `Are you sure you
    want to buy a ${cardNames[pickedCard__id]}?`;
    wrapper.style.backgroundColor = `rgba(0, 0, 0, 0.5)`;
    header.style.filter = `brightness(0.5)`;
    header__navbar.style.pointerEvents = `none`;
    cards__row.style.filter = `brightness(0.5)`;
    cards__row.style.pointerEvents = `none`;
    Array.from(swiperClasses).forEach(swiperClass => {
        swiperClass.classList.add("remove-to-backstage");
    });
}

function removeFocusToDoubleCheck(){
    cards__wrapper.classList.remove("cards__wrapper_active");
    selectedItem__img.remove();
    Array.from(doubleCheck__selectedItem.children).forEach(child =>{
        child.remove();
    })
    douleCheck.classList.remove("double-check__active");
    wrapper.style.backgroundColor = ``;
    header.style.filter = ``;
    header__navbar.style.pointerEvents = `all`;
    cards__row.style.filter = ``;
    cards__row.style.pointerEvents = `all`;
    Array.from(swiperClasses).forEach(swiperClass => {
        swiperClass.classList.remove("remove-to-backstage");
    });
}




let notEnoughPies__items = [];
function isEnoughPiesAmount(){
    pricesValues.forEach((price, index) =>{
        if(data[1].totalPiesAmount < price){
            Array.from(cardBuy)[index].classList.add("not-enough")
        }else{
            Array.from(cardBuy)[index].classList.remove("not-enough")
        }
    })
    notEnoughPies__items.push(document.getElementsByClassName("not-enough"))
    console.log(notEnoughPies__items);
}

isEnoughPiesAmount();


let pickedCard;
let pickedCard__id;
console.log(pickedCard__id);



let areItemsBought; 


const cardRemaining__parent = document.querySelector('.card__remaining');

function checkBoughtItems(){
    areItemsBought = amountOfBoughtItems.filter((amount__object) =>{
        return amount__object[Object.keys(amount__object)[0]] != 0
    })
    console.log(areItemsBought);
    
    if(areItemsBought.length !== 0){
        for(let i = 0; i < cardRemaining.length; i++){
            if(amountOfBoughtItems[i][Object.keys(amountOfBoughtItems[i])[0]] === 0){
                continue;
            }
            cardRemaining[i].textContent = `${formatNumber(Number(amountOfBoughtItems[i][Object.keys(amountOfBoughtItems[i])[0]]))} remaining`;
        }

    }else{
        Array.from(cardRemaining).forEach((card__remaining) =>{
            card__remaining.textContent = ``;
        })
    }
}

checkBoughtItems();


function buyItem(){
    selectedItem__img.remove();
    Array.from(doubleCheck__selectedItem.children).forEach(child =>{
        child.remove();
    })
    data[1].totalPiesAmount = data[1].totalPiesAmount - pricesValues[pickedCard__id]
    let newPiesAmount = data[1].totalPiesAmount - pricesValues[pickedCard__id];
    
    cards__row.insertAdjacentHTML(
            "beforebegin", 
            `<div class="double-check__bought remaining">
                <p>The item is bought</p>
            </div>`
        )        
        checkBoughtItems();
    removeFocusToDoubleCheck();
    const doubleCheck__bought = document.querySelector('.double-check__bought');
    doubleCheck__bought.classList.add('double-check__bought_active')
    
    amountOfBoughtItems[pickedCard__id][Object.keys(amountOfBoughtItems[pickedCard__id])[0]] += 1;
    cardRemaining[pickedCard__id].textContent = `${formatNumber(Number(amountOfBoughtItems[pickedCard__id][Object.keys(amountOfBoughtItems[pickedCard__id])[0]]))} remaining`;
    piesAmount.textContent = formatNumber(data[1].totalPiesAmount);
    localStorage.setItem("amountOfBoughtItems", JSON.stringify(amountOfBoughtItems));
    localStorage.setItem("piesAmount", JSON.stringify(data));


    setTimeout(()=>{
    doubleCheck__bought.classList.remove('double-check__bought_active')
    }, 1000)
    setTimeout(() =>{
    doubleCheck__bought.remove();
    }, 2000)
    isEnoughPiesAmount();
}

isEnoughPiesAmount();
if(notEnoughPies__items[0].length < 3){
    cards__row.addEventListener("click", function(e){
        const targetItem = e.target.closest('.card__buy');
        if(targetItem){
            pickedCard = targetItem.closest('.card');
            pickedCard__id = +pickedCard.id;
            console.log(pricesValues[pickedCard__id]);
            if(data[1].totalPiesAmount >= pricesValues[pickedCard__id]){
                addFocusToDoubleCheck();
                
                doubleCheck__disagree.addEventListener("click", removeFocusToDoubleCheck);
            }
            }
        cards__row.removeEventListener("click", function(e){
            const targetItem = e.target.closest('.card__buy');
            if(targetItem){
                pickedCard = targetItem.closest('.card');
                pickedCard__id = +pickedCard.id;
                console.log(pickedCard__id);
                addFocusToDoubleCheck();
                
                doubleCheck__disagree.addEventListener("click", removeFocusToDoubleCheck);
                
                /*doubleCheck__agree.addEventListener("click", function(){
                    buyItem();
                    doubleCheck__agree.removeEventListener("click", buyItem);
                });*/
            }
        })
    })
}


console.log(pricesValues);