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

    //управление табами на странице rep
    const tabs = document.querySelectorAll('.terms__tab'),
        tabsContent = document.querySelectorAll('.terms__swich');

        tabsContent.forEach(item => { //обнуление всех и выбор первого активным
            $(item).fadeOut(10);
        });
        $(tabsContent[0]).fadeIn(10);

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            if (!tab.classList.contains('terms__activ_tab')) {
                tabs.forEach(item => {
                    item.classList.remove('terms__activ_tab')
                });
                tab.classList.add('terms__activ_tab')
                tabsContent.forEach(item => {
                    $(item).fadeOut();
                });
                $(tabsContent[i]).fadeIn();
            };
        });
    });


    

    //аккордион на странице about

    const accordBtn = document.querySelectorAll('.advice__accord_title_box');

    accordBtn.forEach(item => {
        item.addEventListener('click', () => {
            item.nextElementSibling.classList.toggle('accord_active');
            item.firstElementChild.nextElementSibling.classList.toggle('advice__accord_svg_active');
        })
    });


    //открытие модалок
    function closeModal(modalSelector) { // закрытие окна
        const modal = document.querySelector(modalSelector);
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; 
    }

    function openModal(modalSelector) { // открытие окна
        const modal = document.querySelector(modalSelector);	
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }	

    function modal(triggerSelector, modalSelector) {
        //triggerSelector - тригер для открытия модального окна
        //modalSelector - селектор самого модального окна
        // модальное окно
        const modalTrigger = document.querySelectorAll(triggerSelector), // переменные
            modal = document.querySelector(modalSelector);        

        modalTrigger.forEach(btn => { //запуск по нажатию на одну из кнопок
            btn.addEventListener('click', () => {
                openModal(modalSelector);
            });
        });	

        modal.addEventListener('click', (event) => { //закрытие при нажатии вне окна
            if (event.target === modal || event.target.getAttribute('data-close') == '') {
                closeModal(modalSelector); 
            }
        });

        document.addEventListener('keydown', (e) => { //закрытие эскейпом
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal(modalSelector);
            }
        });	
    };
    modal('[data-modal]', '.modal');

    // работа с кнопками подтверждения в формах
    function forms(formSelector) {
        // Формы
        const forms = document.querySelectorAll(formSelector);//переменная для самой формы

        const message = { //список сообщений для статусов загрузки
            //loading: 'img/form/spinner.svg',
            success: 'Thank you.   We will contact you soon',
            failure: 'Что-то пошло не так...'
        };

        forms.forEach(item => { //цикл для двух видов одной и той же формы
            bindPostData(item);
        }); 



        function bindPostData(form) { //при нажатии подтверждения в форме
            form.addEventListener('submit', (e) => {
                e.preventDefault(); //отключаем стандартное поведение формы

                const statusMessage = document.createElement('img'); //добавка сообщения после выполнения отправки формы
                //statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                    `;
                form.insertAdjacentElement('afterend', statusMessage); 

                showThanksModal(message.success); // заглушка, если не отправлять данные
                //const formData = new FormData(form); //получение данных из формы

                //const json = JSON.stringify(Object.fromEntries(formData.entries())); //сборка json из полученных данных

                // postData('http://localhost:3000/requests', json) //отправка самого запроса с формы обратной связи
                // 	.then(data => { //сообщение о том что все нормально
                // 		console.log(data);
                // 		showThanksModal(message.success);
                // 		statusMessage.remove();
                // 	}).catch(() => { //если произошла ошибка
                // 		showThanksModal(message.failure);
                // 	}).finally(() => {  // очистка формы ввода в любом случае
                // 		form.reset();
                // 	});
            });
        }
        function showThanksModal(message) { //создание модалки после отправки запроса
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            openModal('.modal');

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <svg class="modal__close" data-close>
                        <use data-close xlink:href="img/icons/icons.svg#circle-xmark"></use>
                    </svg>
                    <div class="modal__title mod_title">Спасибо что оставили заявку!</div>
                    <div class="modal__subtitle mod_sutitle">А пока вы ждете звонок, можете просмотреть наши <a href="livingspace.html">лучшие проекты!</a></div>
                    <div class="modal__signature">Мы создаем прекрасное!</div>
                </div>
            `;

            document.querySelector('.modal').append(thanksModal); //возврат на место нормальной модалки
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal('.modal');
            }, 4000);
        }
    }

    forms('form'); // вызов самой функции

    //маска ввода телефона
    $('.callback__input').inputmask({'mask': '+7 (999) 999-99-99'});
    //слайдер на странице rem
    $('.guarantee__slider_box').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        prevArrow: $('.guarantee__prev'),
        nextArrow: $('.guarantee__next'),
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    arrows: false,
                    autoplay: true,
                    speed: 1000
                }
            }
        ],
    });
});