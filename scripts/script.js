"use strict"

const iconMenu = document.querySelector('.nav__icon-burger');
const bodyMenu = document.querySelector('.nav__body');
const textMenu = document.querySelector('.nav__text');

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
let widthWindow = window.innerWidth;

const sliderDocumentContainer = document.querySelector('.slider-documents__container');
const sliderDocumentTracer = document.querySelector('.slider-documents__tracer');
const buttonLeft = document.querySelector('.slider-documents__button_left');
const buttonRight = document.querySelector('.slider-documents__button_right');

const menuLinks = document.querySelectorAll('.nav__link[data-goto]');

const loginButton = document.querySelector('.login-button');
const registerButton = document.querySelector('.register-button');
const popups = document.querySelectorAll('.popup');
const mainContainer = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const btnsClose = document.querySelectorAll('.popup__btn-close');
const timeOut = 800;


addClassHidden();
updateClassHidden();

isLess1200px();

Menu();
animationBottles();
showFertilizerItem();
showHoneyText();

menuLinkScroll();

window.addEventListener('resize', () => {
    if(widthWindow !== window.innerWidth) {
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
        widthWindow = window.innerWidth;
    }
}, false)

buttonLeft.addEventListener('click' , clickButtonLeft);
buttonRight.addEventListener('click' , clickButtonRight);

loginButton.addEventListener('click', () =>{
    openPopup(document.querySelector('.popup-login'));
} );

registerButton.addEventListener('click', (e) =>{
    for(let popup of popups){
        closePopup(popup);
    }
    setTimeout( () =>{
        openPopup(document.querySelector('.popup-register'));
    },timeOut)
    e.preventDefault();
} );
popups.forEach((el)=>{
    el.addEventListener('click', (e) => {
        if(e.target.classList.contains("popup")) {
            closePopup(e.target);
        }
    });
})

btnsClose.forEach((btnClose)=>{
    for(let popup of popups){
        btnClose.addEventListener('click', () => closePopup(popup));
    }
})


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
        el.textContent = "??????";
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
        iconMenu.addEventListener('click', () => {
            openAndCloseMenu();
        })
    }
}
function openAndCloseMenu(){
    document.body.classList.toggle('lock');
    iconMenu.classList.toggle('nav__icon_active');
    bodyMenu.classList.toggle('nav__body_active');
    textMenu.classList.toggle('text-hidden');
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
    (btnElementText.textContent === "????????????????") ? btnElementText.textContent = "??????" :
        btnElementText.textContent = "????????????????";
}

function menuLinkScroll(){
    if(menuLinks.length !== 0) {
        menuLinks.forEach(el => {
            el.addEventListener('click',  onMenuLinkClick)
        })
    }
}
function onMenuLinkClick(e){
    const menuLink = e.target;
    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        if(iconMenu.classList.contains('nav__icon_active')){
            openAndCloseMenu();
        }
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY
            - document.querySelector('.header').offsetHeight;
        window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth',
        });
    }
    e.preventDefault();
}

function openPopup(popup){
    if(!document.body.classList.contains('lock')){
        let widthAll = mainContainer.offsetWidth;
        document.body.classList.add('lock');
        let scrollWidth = mainContainer.offsetWidth - widthAll;
        mainContainer.style.paddingRight = scrollWidth + 'px';
        header.style.paddingRight = scrollWidth + 'px';
        footer.style.paddingRight = scrollWidth + 'px';
    }
    popup.classList.remove('popup_hidden');
}
function closePopup(popup){
    popup.classList.add('popup_hidden');
    if(document.body.classList.contains('lock')){
        setTimeout(()=>{
            document.body.classList.remove('lock');
            mainContainer.style.paddingRight = 0 + 'px';
            header.style.paddingRight = 0 + 'px';
            footer.style.paddingRight = 0 + 'px';
        }, timeOut);
    }
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