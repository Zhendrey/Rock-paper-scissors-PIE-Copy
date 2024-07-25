const wrapper = document.querySelector('.wrapper');
const fireLava = document.querySelector('.fire-lava');
const battle__conclution = document.querySelector('.battle__conclution');
const inspirational_quote = document.querySelector('.inspirational-quote');
const piesAmount = document.querySelector('.pies__amount');
const battleItem = document.querySelectorAll('.battle__item');

const pies__amount_child_p = piesAmount.childNodes[1];
const pies__amount_child_span = pies__amount_child_p.childNodes[1];

fireLava.classList.add("fire-lava__risen");
document.body.classList.add("battle__conclution-inspirational-quote_fade-down")
wrapper.classList.add("battle__conclution-inspirational-quote_fade-down");

const quotes = new XMLHttpRequest();
quotes.open("GET", '/json/quotes.json');



const inspirational_quote__child = inspirational_quote.childNodes[1];

let generatedQuote;
quotes.onload = ()=>{
    const realQuotes = JSON.parse(quotes.responseText);
    const isPositiveOrNegative = Math.round(Math.random() * 2);

    if(isPositiveOrNegative == 0){
        generatedQuote = realQuotes[isPositiveOrNegative].positiveQuotes[Math.floor(Math.random() * 9)];
        piesAmount.classList.add("victory-set_color");
        inspirational_quote__child.innerHTML = `"${generatedQuote}"`;
    }
    else if(isPositiveOrNegative == 1){
        generatedQuote = realQuotes[isPositiveOrNegative].negativeQuotes[Math.floor(Math.random() * 9)];
        battle__conclution.childNodes[1].innerHTML = "YOU LOST THE BATTLE!"
        battle__conclution.classList.add("loss-set_color");
        inspirational_quote__child.classList.add("loss-set_color");
        inspirational_quote__child.innerHTML = `"${generatedQuote}"`;
        pies__amount_child_span.innerHTML = `-`
        piesAmount.classList.add("loss-set_color");
    }else{
        generatedQuote = realQuotes[isPositiveOrNegative].allTheQuotes[Math.floor(Math.random() * 9)];
        battle__conclution.childNodes[1].innerHTML = "TIE!"
        battle__conclution.classList.add("tie-set_color");
        inspirational_quote__child.classList.add("tie-set_color");
        inspirational_quote__child.innerHTML = `"${generatedQuote}"`;
        pies__amount_child_span.innerHTML = ``;
        pies__amount_child_p.innerHTML = 0;
        piesAmount.classList.add("tie-set_color");
    }
}

    
quotes.onerror = ()=>{
    inspirational_quote__child.innerHTML = `OOPS! WE COULD NOT LOAD THE QUOTES :(`
}

quotes.send();
console.log(battleItem);



    const optionDOM = new XMLHttpRequest();
    optionDOM.open("GET", '/secondary webpages/endGame.html');
    if(optionDOM.status === 200){
        optionDOM.onload = ()=>{
            const optionDOM__data = JSON.parse(optionDOM.responseText);
            console.log(optionDOM__data);
        }
    }else{
        console.error(`Unfortunetly, we could not load dara`);
    }
    optionDOM.send();
//battle__conclution-inspirational-quote_fade-down
