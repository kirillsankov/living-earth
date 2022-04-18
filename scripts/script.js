"use strict"
const iconMenu = document.querySelector('.nav__icon-burger');
const introductoryBottles = document.querySelectorAll('.introductory__bottle');

const buttonsAdvantages = document.querySelectorAll(".block__button");

const fertilizerEffectivenessItem = document.querySelectorAll('.fertilizer__effectiveness-item');
const fertilizerButton = document.querySelector('.fertilizer__button');

const honeyText = document.querySelectorAll('.honey__text-item:not(:first-child)');

const blockItemThree = document.querySelector('.applications .block__item:nth-of-type(3)');
let fClick;
let isOne = false;


addClassHidden();
updateClassHidden();
if (document.body.offsetWidth <= 1030) {
    isOne = true;
}

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

if (introductoryBottles.length !== 0) {
    window.addEventListener("load", () => {
        setTimeout(() => {
            for (let introductoryBottle of introductoryBottles) {
                introductoryBottle.classList.add("active");
            }
        }, 500);
    });
}


if (fertilizerEffectivenessItem.length !== 0) {
    for (let i = 5; i < fertilizerEffectivenessItem.length; i++) {
        fertilizerEffectivenessItem[i].classList.add('fertilizer__effectiveness-item_hidden');
    }
    fertilizerButton.addEventListener('click', () => {
        for (let i = 5; i < fertilizerEffectivenessItem.length; i++) {
            fertilizerEffectivenessItem[i].classList.toggle('fertilizer__effectiveness-item_hidden');
        }
    })
}

if (honeyText.length !== 0) {
    for (let i = 0; i < honeyText.length; i++) {
        honeyText[i].classList.add('honey__text-item_hidden');
    }
    const honeyTextButton = honeyText[0].parentNode.querySelector('.honey__text-button');
    honeyTextButton.addEventListener('click', () => {
        honeyText.forEach((el) => {
            el.classList.toggle('honey__text-item_hidden');
        });
    });
}


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
}, false)

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
}

function click(blocksHidden) {
    for (let block of blocksHidden) {
        if (block.classList.contains('block__item_remove')) {
            block.classList.remove('block__item_remove')
            setTimeout(() => block.classList.remove('block__item_hidden'), 1)
        } else {
            block.classList.add('block__item_hidden')
            setTimeout(() => block.classList.add('block__item_remove'), 300);
        }
    }
}

function updateClassHidden() {
    if (buttonsAdvantages.length !== 0) {
        for (let buttonAdvantages of buttonsAdvantages) {
            let blockContainer = buttonAdvantages.parentNode.querySelector('.block__container');
            let blocksHidden = blockContainer.querySelectorAll('.block__item_hidden');
            fClick = click.bind(this, blocksHidden);
            buttonAdvantages.addEventListener('click', fClick, false);
        }
    }
}

function updateClassHiddenThree() {
    const blockContainerThree = blockItemThree.parentNode;
    let blockItemHidden = blockContainerThree.querySelectorAll('.block__item_hidden');
    let buttonThree = blockContainerThree.parentNode.querySelector('.block__button');
    buttonThree.removeEventListener('click', fClick, false);
    fClick = click.bind(this, blockItemHidden);
    buttonThree.addEventListener('click', fClick, false);
}


const sliderDocumentContainer = document.querySelector('.slider-documents__container');
const sliderDocumentTracer = document.querySelector('.slider-documents__tracer');
const buttonLeft = document.querySelector('.slider-documents__button_left');
const buttonRight = document.querySelector('.slider-documents__button_right');



buttonLeft.addEventListener('click' , () => {
    const sliderItems = sliderDocumentContainer.querySelectorAll('.slider-documents__item');
    for(let i = 0; i < sliderItems.length; i++) {

        if(sliderItems[i].classList.contains('slider-documents__item_active') && i === 0) {
            sliderItems[i].classList.remove('slider-documents__item_active');
            sliderItems[sliderItems.length - 1].classList.add('slider-documents__item_active');
            break;
        }
        if(sliderItems[i].classList.contains('slider-documents__item_active')){
            sliderItems[i].classList.remove('slider-documents__item_active');
            sliderItems[i - 1].classList.add('slider-documents__item_active');
            break;
        }
    }
    sliderItems[sliderItems.length - 1].classList.add('slider-documents__item_anim');
    sliderDocumentTracer.insertAdjacentElement("afterbegin", sliderItems[sliderItems.length - 1]);
    setTimeout(() => {
        sliderItems[sliderItems.length - 1].classList.remove('slider-documents__item_anim');
    }, 0)
})
buttonRight.addEventListener('click' , () => {
    const sliderItems = sliderDocumentContainer.querySelectorAll('.slider-documents__item');
    for(let i = 0; i < sliderItems.length; i++) {
        if(sliderItems[i].classList.contains('slider-documents__item_active') && i === sliderItems.length - 1) {
            sliderItems[i].classList.remove('slider-documents__item_active');
            sliderItems[0].classList.add('slider-documents__item_active');
            break;
        }
        if(sliderItems[i].classList.contains('slider-documents__item_active')) {
            sliderItems[i].classList.remove('slider-documents__item_active');
            sliderItems[i + 1].classList.add('slider-documents__item_active');
            break;
        }
    }
    sliderItems[0].classList.add('slider-documents__item_anim');
    setTimeout(()=>{
        sliderDocumentTracer.insertAdjacentElement('beforeend',sliderItems[0]);
        sliderItems[0].classList.remove('slider-documents__item_anim');
    }, 1000)
})
