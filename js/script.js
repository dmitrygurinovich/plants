let container = document.querySelector('.container');
let mobileMenu = document.querySelector('.header-nav-mobile');
let closeMobileMenuButton = document.querySelector('.close-button__img');
let burgerButton = document.querySelector('.header-nav-burger');
let mobileMenuItems = Array.from(document.querySelectorAll('.header-nav-mobile__item'));

/* Mobile menu */
function showMobileMenu() {
  container.style.transitionDuration = '2s';
  mobileMenu.style.transitionProperty = 'margin-top';
  mobileMenu.style.transitionDuration = '1s';
  container.style.paddingTop = 140 + 'px';
  mobileMenu.style.marginTop = 0 + 'px';
  mobileMenu.classList.add('opened');

  document.addEventListener('click', (ev) => {
    if (!ev.composedPath().includes(mobileMenu) && ev.target.classList.value != 'header-nav-burger__img') {
      closeMobileMenu();
    }
  });
}

burgerButton.addEventListener('click', showMobileMenu);

function closeMobileMenu() {
  container.style.transitionDuration = '0.5s';
  container.style.paddingTop = 0;
  mobileMenu.style.marginTop = '-245px';
  mobileMenu.style.transitionDuration = '1s';
  mobileMenu.classList.remove('opened');
}

closeMobileMenuButton.addEventListener('click', closeMobileMenu);

mobileMenuItems.map(menuItem => menuItem.addEventListener('click', closeMobileMenu));
/** END - Mobile menu */

/* Services */
let serviceButtons = Array.from(document.querySelectorAll('.categories__category-button'));
let cards = Array.from(document.querySelectorAll('.service__item'));

serviceButtons.map((button) => button.addEventListener('click', activateCategory));

// счетчик активных кнопок
let activeButtonCounter = 0;

function activateCategory(event) {
  let button = event.target;
  // меняем цвета кнопок при выделении и снятии выделения
  if (!Array.from(button.classList).includes('categories__category-button_active')) {
    button.classList.add('categories__category-button_active');
    button.style.color = '#FFFFFF';
    button.style.background = '#E06733';
    activeButtonCounter++;
  } else if (Array.from(button.classList).includes('categories__category-button_active')) {
    button.classList.remove('categories__category-button_active');
    button.style.color = '#E06733';
    button.style.background = '#EDF2EC';
    activeButtonCounter--;
  }

  //как только становится активной хоть одна кнопка - все карточки блюрятся, потом соответствующие разблюриваются
  if (activeButtonCounter > 0) {
    cards.filter(card => !Array.from(card.classList).includes('categories__category-button_active')).map(card => card.style.filter = 'blur(2px)');
  } else {
    cards.filter(card => !Array.from(card.classList).includes('categories__category-button_active')).map(card => card.style.filter = 'none');
  }

  //проверяем активные кнопки, берем у кнопки класс с категорией и ищем карточки с такой категорией
  serviceButtons.filter(button => Array.from(button.classList).includes('categories__category-button_active')).map(button => {
    let category = Array.from(button.classList)[1];
    cards.filter(card => Array.from(card.classList).includes(category)).map(card => card.style.filter = 'none');
  })

  // убираем событие с неактивной кнопки при двух активных
  if (activeButtonCounter == 2) {
    serviceButtons.filter(x => !Array.from(x.classList).includes('categories__category-button_active')).map(x => {
      x.removeEventListener('click', activateCategory);
      x.style.filter = 'blur(2px)';
    });
  } else {
    serviceButtons.filter(x => !Array.from(x.classList).includes('categories__category-button_active')).map(x => {
      x.addEventListener('click', activateCategory);
      x.style.filter = 'none';
    });
  }
}

/* Prices */
let plansItems = Array.from(document.querySelectorAll('.plans__item'));
let plansButtons = Array.from(document.querySelectorAll('.item__btn-arrow'));

plansButtons.map(button => button.addEventListener('click', planSelection));

function planSelection(plan) {

  if (!Array.from(plan.target.classList).includes('item__btn-arrow_opened')) {
    plansButtons
      .filter(button => Array.from(button.classList).includes('item__btn-arrow_opened'))
      .map(button => {
        button.classList.remove('item__btn-arrow_opened');
        button.parentNode.classList.remove('plans__item_active');
        button.parentNode.querySelector('.item__content').classList.remove('item__content_active');
        button.style.opacity = '30%';
        button.setAttribute('src', './img/accordion_btn_closed.svg');
        setTimeout(() => {
          button.style.opacity = '100%';
        }, 500);
      });
    plan.target.classList.add('item__btn-arrow_opened');
    plan.target.parentNode.querySelector('.item__content').classList.add('item__content_active');
    plan.target.parentNode.classList.add('plans__item_active');
    plan.target.style.opacity = '30%';
    plan.target.setAttribute('src', './img/accordion_btn_opened.svg');
    setTimeout(() => {
      plan.target.style.opacity = '100%';
    }, 500);
  } else {
    plan.target.classList.remove('item__btn-arrow_opened');
    plan.target.parentNode.classList.remove('plans__item_active');
    plan.target.parentNode.querySelector('.item__content').classList.remove('item__content_active');
    plan.target.style.opacity = '30%';
    plan.target.setAttribute('src', './img/accordion_btn_closed.svg');
    setTimeout(() => {
      plan.target.style.opacity = '100%';
    }, 500);
  }

}
let adresses = new Map([
  [
    'canandaigua', {
    'city': 'Canandaigua, NY',
    'phone': '+1	585	393 0001',
    'office': '151 Charlotte Street'
    }
  ],
  [
    'nyc', {
    'city': 'New York City',
    'phone': '+1	212	456 0002',
    'office': '9 East 91st Street'
    }
  ],
  [
    'yonkers', {
    'city': 'Yonkers, NY',
    'phone': '+1	914	678 0003',
    'office': '511 Warburton Ave'
    }
  ],
  [
    'sherrill', {
    'city': 'Sherrill, NY',
    'phone': '+1	315	908 0004',
    'office': '14 WEST Noyes BLVD'
    }
  ]
]);

function showAdressVariants(event) {
  let button = event.target;
  let form = document.querySelector('.contacts__form');
  let adressesList = document.querySelector('.form-variants__list');
  let adressCard = document.querySelector('.adress__card');

  if(!adressCard.classList.contains('adress__card_active')) {
    form.classList.toggle('contacts__form_active');
  }
  
  button.classList.toggle('form__btn-arrow_active');
  adressesList.classList.toggle('form-variants__list_active');
}

document.querySelector('.form__btn-arrow').addEventListener('click', showAdressVariants);

function activateAdressVariant(event) {
  let button = document.querySelector('.form__btn-arrow');
  let adressesList = document.querySelector('.form-variants__list');
  let buttonCity = event.target.classList[1];
  let adress = adresses.get(buttonCity);
  let form = document.querySelector('.contacts__form');

  document.querySelector('.form__text').textContent = adress['city'];

  if(!form.classList.contains('contacts__form_active')) {
    form.classList.add('contacts__form_active');
  }

  if(!button.classList.contains('form__btn-arrow_active')) {
    button.classList.add('form__btn-arrow_active');
  }
  adressesList.classList.toggle('form-variants__list_active');
  
  let cityValue = document.querySelector('.city__value');
  let phoneValue = document.querySelector('.phone__value');
  let adressValue = document.querySelector('.adress__value');
  let adressCard = document.querySelector('.adress__card');
  let link = document.querySelector('.call-us__link');
  let callUsImg =document.querySelector('.contacts__img');

  if(window.innerWidth <= 380) {
    callUsImg.style.marginTop = '170px';
  }

  console.log(window.innerWidth);
  cityValue.textContent = adress['city'];
  phoneValue.textContent = adress['phone'];
  adressValue.textContent = adress['office'];
  
  
  if(!adressCard.classList.contains('adress__card_active')) {
    adressCard.classList.add('adress__card_active');
  }
  
  link.setAttribute('href', 'tel:'.concat(adress['phone']));

}

Array.from(document.querySelectorAll('.form-variants__item')).map(
  x => x.addEventListener('click', activateAdressVariant)
);
console.log(`
1. При нажатии на кнопки: "Gardens","Lawn","Planting" происходит смена фокуса на услугах в разделе "service" +50  
  - При выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20
  - Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20
  - Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10
2. Accordion в секции "prices" реализация 3-х выпадающих списков об услугах и ценах + 50
  - При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка "order", которая ведет на секцию "contacts", при нажатии на нее Accordion все еще остается открытым. +25
  - Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25
3. В разделе "contacts" реализован select с выбором городов +25
  - В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15
  - При нажатии на кнопку "Call us" реализован вызов по номеру, который соответствует выбранному городу +10
  Итоговая оценка: 100 баллов.
    `);
