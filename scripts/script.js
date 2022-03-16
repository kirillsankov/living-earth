"use strict"
const iconMenu = document.querySelector('.nav__icon-burger');
const introductoryBottles = document.querySelectorAll('.introductory__bottle');


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