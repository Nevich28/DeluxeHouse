import * as flsFunctions from "./modules/functions.js"; // функция для обработки WebP


window.addEventListener('DOMContentLoaded', () => {

flsFunctions.isWebp(); // функция для обработки WebP

// делаем выпадающее меню в десктопе
//выбираем переменные
const menuBtn = document.querySelector('#header_menu'),
      menuList = document.querySelector('.header__portfolio');

//выводим меню при нажатии      
menuBtn.addEventListener('click', () => {
   if (menuList.style.display !== 'block' && menuList.style.display !== 'flex') {
        menuBtn.firstElementChild.classList.add('header_no_emphasize');
        $(menuList).fadeIn();
   }
});

// скрываем при нажатии вне меню
$(document).mouseup(function (e) {
    const container = $(".header__portfolio");
    if (container.has(e.target).length === 0){
        $(menuList).fadeOut();
        menuBtn.firstElementChild.classList.remove('header_no_emphasize');
    }
});

// меню с гамбургером
    //Управление гамбургером
    const hamburger = document.querySelector('.hamburger'),
            menu = document.querySelector('.header__menu'),
            menuItem = document.querySelectorAll('.header__menu_item');

    hamburger.addEventListener('touchstart', () => {
        hamburger.classList.toggle('hamburger__cross');
        menu.classList.toggle('header__menu_activ');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', (e) => {
            console.log(e.target.id);
            if (item.firstElementChild.id !== 'header_menu' || e.target.id !== 'portfolio') {
                hamburger.classList.toggle('hamburger__cross');
                menu.classList.toggle('header__menu_activ');
            }
        });
    });
})