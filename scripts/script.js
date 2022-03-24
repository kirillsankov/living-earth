"use strict"
const iconMenu = document.querySelector('.nav__icon-burger');
const introductoryBottles = document.querySelectorAll('.introductory__bottle');

const buttonsAdvantages = document.querySelectorAll(".block__button");

const fertilizerEffectivenessItem = document.querySelectorAll('.fertilizer__effectiveness-item');
const fertilizerButton = document.querySelector('.fertilizer__button');

if(iconMenu){
    const bodyMenu = document.querySelector('.nav__body');
    const textMenu = document.querySelector('.nav__text');
    iconMenu.addEventListener('click', () => {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('nav__icon_active');
        bodyMenu.classList.toggle('nav__body_active');
        textMenu.classList.toggle('text-hidden');
    })
}

if(introductoryBottles.length !== 0){
   window.addEventListener("load", ()=>{
       setTimeout(()=>{
           for(let introductoryBottle of introductoryBottles){
               introductoryBottle.classList.add("active");
           }
       }, 500);
   });
}

if(buttonsAdvantages.length !== 0){
        for(let buttonAdvantages of buttonsAdvantages){
            let blockContainer = buttonAdvantages.parentNode.querySelector('.block__container');
            let blocksHidden = blockContainer.querySelectorAll('.block__item_hidden');
            buttonAdvantages.addEventListener('click', () =>{
                for(let block of blocksHidden){
                    block.classList.toggle('block__item_hidden');
                }
                blockContainer.classList.toggle('block__container_gap');
            })
        }
}

if(fertilizerEffectivenessItem.length !== 0){
    for(let i = 5; i <  fertilizerEffectivenessItem.length; i++){
        fertilizerEffectivenessItem[i].classList.add('fertilizer__effectiveness-item_hidden');
    }
    fertilizerButton.addEventListener('click', ()=>{
        for(let i = 5; i <  fertilizerEffectivenessItem.length; i++){
            fertilizerEffectivenessItem[i].classList.toggle('fertilizer__effectiveness-item_hidden');
        }
    })
}