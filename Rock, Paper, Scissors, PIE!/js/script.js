const scenes = document.querySelectorAll('.scene');
const introduction = document.querySelector('.introduction');
const skipArrows = document.querySelector('.skip-arrows');
//!SCENE #1
const bigRocks = document.querySelector('.big-rocks');
const bigRocks__row = document.querySelector('.big-rocks__row');
const rockCave__row = document.querySelector('.rock-cave__row');

//!SCENE #2
const defend__row = scenes[1].children[0];
const footer__mountains__backround = scenes[1].children[1];

//!SCENE #3
const cut__title = scenes[2].children[0].children[0];
const cut__body = scenes[2].children[0].children[scenes[2].children.length];

//! SCENE #4
const pie__exploded = scenes[3].children[0];
const scene4__footer = scenes[3].children[scenes[3].children.length - 1];



//! MAIN PAGE

const mainPage = document.querySelector('.main-page');
const mainPage__header = document.querySelector('.header__main-page');
const mainPage__button = document.querySelector('.main-page-button');
const howMuchPies__help = document.querySelector('.how-much-pies__help');

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
const howMuchPies = document.querySelector('.how-much-pies');
const piesAmount = document.querySelector(".pies-amount");

/**/
let transitionDelay;
transitionDelay = 1.6;

let nextScene__transition = 1500;
const intro__transition = `all 1s ease ${transitionDelay}s`;

let loopCounter = 0;
    function scene1__FadeUp(){
        scenes[0].classList.add('scenes1-fade-up');
        bigRocks__row.classList.add('big-tocks-fade-up');
        rockCave__row.classList.add('rock-cave-fade-up');
        setTimeout(scene1__FadeAway, nextScene__transition);
        setTimeout(scene2__FadeUp, nextScene__transition * transitionDelay);
        loopCounter++;
        if(loopCounter > 2){
            skipArrows.style.display = `block`;
        }
    }
    function scene1__FadeAway(){
        scenes[0].classList.remove('scenes1-fade-up');
        bigRocks__row.classList.remove('big-tocks-fade-up');
        rockCave__row.classList.remove('rock-cave-fade-up');
    }
    
    function scene2__FadeUp(){
        scenes[1].classList.add('scenes2-fade-up');
        defend__row.classList.add('defend-row-fade-up');
        footer__mountains__backround.classList.add('footer-mountains-backround-fade-up');
        setTimeout(scene2__FadeAway, nextScene__transition)
        setTimeout(scene3__FadeUp, nextScene__transition * transitionDelay);
    }
    function scene2__FadeAway(){
        scenes[1].classList.remove('scenes2-fade-up');
        defend__row.classList.remove('defend-row-fade-up');
        footer__mountains__backround.classList.remove('footer-mountains-backround-fade-up');
    }
    
    function scene3__FadeUp(){
        scenes[2].classList.add('scenes-3-fade-up');
        cut__title.classList.add('cut__title-fade-up');
        cut__body.classList.add('cut__body-fade-up');
        setTimeout(scene3__FadeAway, nextScene__transition)
        setTimeout(scene4__FadeUp, nextScene__transition * transitionDelay);
    }
    function scene3__FadeAway(){
        scenes[2].classList.remove('scenes-3-fade-up');
        cut__title.classList.remove('cut__title-fade-up');
        cut__body.classList.remove('cut__body-fade-up');
    }
    
    function scene4__FadeUp(){
        scenes[3].classList.add('scene-4__fade__up');
        pie__exploded.classList.add('pie-exploded__fade__up');
        scene4__footer.classList.add('scene-4__footer__fade__up');
        setTimeout(scene4__FadeAway, nextScene__transition);
        setTimeout(scene1__FadeUp, nextScene__transition * transitionDelay);
    }
    function scene4__FadeAway(){
        scenes[3].classList.remove('scene-4__fade__up');
        pie__exploded.classList.remove('pie-exploded__fade__up');
        scene4__footer.classList.remove('scene-4__footer__fade__up');
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

    let interactions;
    function addInteractionsAmount(interactedCases){
        let amountOfCases = casesCountsData[0];
        interactedCases = amountOfCases.filter(caseElem => {
            return caseElem !== 0
        });
        return interactedCases;
    }
    interactions = addInteractionsAmount(interactions);
    if(interactions.length > 0){
        howMuchPies.classList.add("active-visible")
        piesAmount.textContent = formatNumber(Number(data[1].totalPiesAmount));
    }



    function showMainPage(event){
        window.removeEventListener("load", scene1__FadeUp)
        document.body.classList.remove();
        document.body.style.overflowY = 'scroll'
            introduction.style.display = `none`;
            mainPage.style.display = `block`;
            mainPage.style.opacity = 1;
            setTimeout(()=>{
                mainPage.classList.add("active");
            }, -150)
        }
        window.addEventListener("load", scene1__FadeUp);
        window.addEventListener('scroll', showMainPage);
        if(window.history.length > 1){
            scrollTo(0,1)
            interactions = addInteractionsAmount(interactions);
            if(interactions.length !== 0){
                howMuchPies.classList.add("active-visible")
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

mainPage__button.addEventListener("click", ()=>{
    location.href = `/secondary webpages/options.html`
})