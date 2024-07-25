import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

let preWidth = window.innerWidth;
let swiper;

function isNarrow(){
    let currentWidth = window.innerWidth;
    preWidth = currentWidth;
    console.log(`Screen width: ${currentWidth}`);
}

        swiper = new Swiper('.swiper', {
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
        
              keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
            
        });

    console.log(window.innerWidth);


   /* And if we need scrollbar
    scrollbar: {
    el: '.swiper-scrollbar',
    },
    */