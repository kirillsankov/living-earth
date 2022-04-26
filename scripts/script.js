"use strict"
const iconMenu = document.querySelector('.nav__icon-burger');
const introductoryBottles = document.querySelectorAll('.introductory__bottle');
const buttonsAdvantages = document.querySelectorAll(".block__button");
const fertilizerEffectivenessItem = document.querySelectorAll('.fertilizer__effectiveness-item');
const fertilizerButton = document.querySelector('.fertilizer__button');
const honeyText = document.querySelectorAll('.honey__text-item:not(:first-child)');
const blockItemThree = document.querySelector('.applications .block__item:nth-of-type(3)');
let blockArrayHidden = [];
let buttonArrayHidden = [];
let fClick;
let isOne = false;
let isHidden = true;

const sliderDocumentContainer = document.querySelector('.slider-documents__container');
const sliderDocumentTracer = document.querySelector('.slider-documents__tracer');
const buttonLeft = document.querySelector('.slider-documents__button_left');
const buttonRight = document.querySelector('.slider-documents__button_right');


addClassHidden();
updateClassHidden();

isLess1200px();

Menu();
animationBottles();
showFertilizerItem();
showHoneyText();

window.addEventListener('resize', () => {
    if (document.body.offsetWidth <= 1030 && !isOne) {
        addClassHidden();
        updateClassHiddenThree();
        isOne = true;
    } else if (document.body.offsetWidth > 1030 && isOne) {
        removeClassHidden();
        updateClassHiddenThree();
        isOne = false;
    }
    if(!isHidden) {
        isHidden = true;
        hiddenBlock();
        resetButtonText();
    }
}, false)

buttonLeft.addEventListener('click' , clickButtonLeft);
buttonRight.addEventListener('click' , clickButtonRight);

function isLess1200px(){
    if (document.body.offsetWidth <= 1030) {
        isOne = true;
    }
}


function addClassHidden() {
    if (document.body.offsetWidth <= 1030 && !blockItemThree.classList.contains('block__item_hidden')
        && !blockItemThree.classList.contains('block__item_remove')) {
        blockItemThree.classList.add('block__item_hidden');
        blockItemThree.classList.add('block__item_remove');
    }
}
function removeClassHidden() {
    if (document.body.offsetWidth > 1030 && blockItemThree.classList.contains('block__item_hidden')
        && blockItemThree.classList.contains('block__item_remove')) {
        blockItemThree.classList.remove('block__item_hidden');
        blockItemThree.classList.remove('block__item_remove');
    }
    let index = blockArrayHidden.indexOf(blockItemThree);
    if(index !== -1){
        blockArrayHidden.splice(index,1);
    }

}
function click(blocksHidden, button) {
    for (let block of blocksHidden) {
        if (block.classList.contains('block__item_remove')) {
            block.classList.remove('block__item_remove')
            setTimeout(() => block.classList.remove('block__item_hidden'), 1)
        } else {
            block.classList.add('block__item_hidden')
            setTimeout(() => block.classList.add('block__item_remove'), 300);
        }
        if(blockArrayHidden.indexOf(block) === -1) blockArrayHidden.push(block);
    }
    isHidden = false;
    let btn = button.querySelector('.products__button');
    buttonArrayHidden.push(btn)
    toggleNameButton(btn);
}
function updateClassHidden() {
    if (buttonsAdvantages.length !== 0) {
        for (let buttonAdvantages of buttonsAdvantages) {
            let blockContainer = buttonAdvantages.parentNode.querySelector('.block__container');
            let blocksHidden = blockContainer.querySelectorAll('.block__item_hidden');
            fClick = click.bind(this, blocksHidden, buttonAdvantages);
            buttonAdvantages.addEventListener('click', fClick, false);
        }
    }
}
function updateClassHiddenThree() {
    const blockContainerThree = blockItemThree.parentNode;
    let blockItemHidden = blockContainerThree.querySelectorAll('.block__item_hidden');
    let buttonThree = blockContainerThree.parentNode.querySelector('.block__button');
    buttonThree.removeEventListener('click', fClick, false);
    fClick = click.bind(this, blockItemHidden, buttonThree);
    buttonThree.addEventListener('click', fClick, false);
}
function hiddenBlock(){
    blockArrayHidden.forEach((el)=>{
        el.classList.add('block__item_hidden')
        el.classList.add('block__item_remove');
    });
}
function resetButtonText(){
    buttonArrayHidden.forEach((el) =>{
        el.textContent = "Ещё";
    })
}


function setItemActive (itemsArray, offsetIndex, lastElement, firstElement ) {
    for(let i = 0; i < itemsArray.length; i++) {
        if(itemsArray[i].classList.contains('slider-documents__item_active') && i === lastElement) {
            itemsArray[i].classList.remove('slider-documents__item_active');
            itemsArray[firstElement].classList.add('slider-documents__item_active');
            break;
        }
        if(itemsArray[i].classList.contains('slider-documents__item_active')) {
            itemsArray[i].classList.remove('slider-documents__item_active');
            itemsArray[i + offsetIndex].classList.add('slider-documents__item_active');
            break;
        }
    }
}
function setNextSliderItem(sliderItems){
    sliderItems[0].classList.add('slider-documents__item_anim');
    setTimeout(()=>{
        sliderDocumentTracer.insertAdjacentElement('beforeend',sliderItems[0]);
        sliderItems[0].classList.remove('slider-documents__item_anim');
    }, 1000)
}
function setPreviousSliderItem(sliderItems){
    sliderItems[sliderItems.length - 1].classList.add('slider-documents__item_anim');
    sliderDocumentTracer.insertAdjacentElement("afterbegin", sliderItems[sliderItems.length - 1]);
    setTimeout(() => {
        sliderItems[sliderItems.length - 1].classList.remove('slider-documents__item_anim');
    }, 0)
}
function expectCompletionListener(button, listener){
    button.removeEventListener('click' , listener);
    setTimeout(()=> {
        button.addEventListener('click' , listener);
    },1000);
}
function clickButtonRight(){
    const sliderItems = sliderDocumentContainer.querySelectorAll('.slider-documents__item');
    setItemActive(sliderItems, 1, sliderItems.length - 1,0);
    setNextSliderItem(sliderItems);
    expectCompletionListener(buttonRight, clickButtonRight)
}
function clickButtonLeft(){
    const sliderItems = sliderDocumentContainer.querySelectorAll('.slider-documents__item');
    setItemActive(sliderItems, -1, 0, sliderItems.length - 1);
    setPreviousSliderItem(sliderItems);
    expectCompletionListener(buttonLeft, clickButtonLeft)
}


function Menu(){
    if (iconMenu) {
        const bodyMenu = document.querySelector('.nav__body');
        const textMenu = document.querySelector('.nav__text');
        iconMenu.addEventListener('click', () => {
            document.body.classList.toggle('lock');
            iconMenu.classList.toggle('nav__icon_active');
            bodyMenu.classList.toggle('nav__body_active');
            textMenu.classList.toggle('text-hidden');
        })
    }
}
function animationBottles(){
    if (introductoryBottles.length !== 0) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                for (let introductoryBottle of introductoryBottles) {
                    introductoryBottle.classList.add("active");
                }
            }, 500);
        });
    }
}
function showFertilizerItem(){
    if (fertilizerEffectivenessItem.length !== 0) {
        for (let i = 5; i < fertilizerEffectivenessItem.length; i++) {
            fertilizerEffectivenessItem[i].classList.add('fertilizer__effectiveness-item_hidden');
        }
        fertilizerButton.addEventListener('click', () => {
            for (let i = 5; i < fertilizerEffectivenessItem.length; i++) {
                fertilizerEffectivenessItem[i].classList.toggle('fertilizer__effectiveness-item_hidden');
            }
            toggleNameButton(fertilizerButton.querySelector('.products__button'));
        })
    }
}
function showHoneyText(){
    if (honeyText.length !== 0) {
        for (let i = 0; i < honeyText.length; i++) {
            honeyText[i].classList.add('honey__text-item_hidden');
        }
        const honeyTextButton = honeyText[0].parentNode.querySelector('.honey__text-button');
        honeyTextButton.addEventListener('click', () => {
            honeyText.forEach((el) => {
                el.classList.toggle('honey__text-item_hidden');
            });
            toggleNameButton(honeyTextButton.querySelector('.products__button'));
        });
    }
}
function toggleNameButton(btnElementText){
    (btnElementText.textContent === "Свернуть") ? btnElementText.textContent = "Ещё" :
        btnElementText.textContent = "Свернуть";
}

$(document).ready(function (){
    $('.slider-news').slick({
        slidesToShow: 2,
        speed: 1000,
        variableWidth: true,
        responsive: [
            {
                breakpoints: 1089,
                slidesToShow: 1,
            }
        ],
    });
});