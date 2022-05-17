`use strict`

var mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

const productName = [
  `Двушка в центре Питера`,
  `Однушка в спальнике Питера`,
  `Трёшка рядом с Кремлём`,
  `Студия для аскетов`,
  `Апартаменты для фрилансера`
];

const productDescription = [
  `Студия с лаконичным дизайном возле Ангары.`,
  `Трёхкомнатная квартира для большой семьи рядом с Кремлём.`,
  `2 минуты до набережной и прекрасного вида на Волгу.`,
  `В квартире есть сауна, джакузи и домашний кинотеатр. Перепланировка согласованна.`,
  `Уютная однушка в тихом спальном районе. Рядом лес и озёра.`,
];

const sellerFullname = [
  `Бюро Семёна`, 
  `Игнат-Агент`, 
  `Виталий Петрович`, 
  `Марья Андреевна`
];

const productCategory = `Недвижимость`;

const addressCity = [
  `Иркутск `, 
  `Москва`, 
  `Красноярск`, 
  `Минск`
];

const addressStreet = [
  `ул. Шахтёров`, 
  `ул. Полярная`, 
  `ул. Лиственная`, 
  `ул. Мира`, 
  `ул. Советская`
];

const fileName = [
  `apt_1.png`,
  `apt_2.png`,
  `apt_3.png`,
  `apt_4.png`,
  `apt_5.png`,
  `apt_6.png`,
  `house_1.png`,
  `house_2.png`,
  `house_3.png`,
  `house_4.png`,
];

const filtersType = [
  `house`, 
  `apartment`, 
  `flat`
];

const monthNames = [`января`, `февраля`, `марта`, `апреля`, `мая`, `июня`, `июля`, `августа`, `сентября`, `октября`, `ноября`, `декабря`];

let product;

let products = [];

const productList = document.querySelector(`.results__list`);
const popup = document.querySelector(`.popup`);

function randomProduct(i){
  return product = {
    index: i,
    name: productName[Math.floor(Math.random()*productName.length)],
    description: productDescription[Math.floor(Math.random()*productDescription.length)],
    price: Math.floor(Math.floor(Math.random() * (2000000 - 250000 + 1) + 250000) / 100) * 100,
    category: productCategory,
    seller: {
      fullname: sellerFullname[Math.floor(Math.random()*sellerFullname.length)],
      rating: (Math.random() * 5).toFixed(1)
    },
    publishDate: renderDate(),
    address: {
      city: addressCity[Math.floor(Math.random()*addressCity.length)],
      street: addressStreet[Math.floor(Math.random()*addressStreet.length)],
      building: `д.${Math.floor(Math.random() * (40-1) + 1)}`
    },
    photos: `img/${fileName[Math.floor(Math.random()*fileName.length)]}`,
    filters: {
      type: filtersType[Math.floor(Math.random()*filtersType.length)],
      area: Math.floor(Math.random() * (250 - 30) + 30),
      roomsCount: Math.floor(Math.random() * (7 - 1) + 1)
    }
  };
};

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

function renderDate(){
  const dateNow = new Date();
  const date = randomDate(new Date(2022, 4, 10), dateNow);
  if(`${date.getDate()} ${date.getMonth()} ${date.getFullYear()}` === `${dateNow.getDate()} ${dateNow.getMonth()} ${dateNow.getFullYear()}`){
    return `Сегодня`;
  }
  if(`${date.getDate()}` === `${dateNow.getDate()-1}` && `${date.getMonth()} ${date.getFullYear()}` === `${dateNow.getMonth()} ${dateNow.getFullYear()}`){
    return `Вчера`;
  }
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

function createProducts(){
  for (let i = 0; i < 7; i++) {
    products.push(randomProduct(i));
  };
};

function getProductList(products){
  const productMarkup = products.map(productItem =>
    `<li class="results__item product" data-index="${productItem.index}">
    <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="floor"/>
      </svg>
    </button>
    <div class="product__image">
      <div class="product__image-more-photo hidden">+2 фото</div>
      <img src="${productItem.photos}" width="318" height="220" alt="${productItem.name}">
    </div>
    <div class="product__content">
      <h3 class="product__title">
        <a href="#">${productItem.name}</a>
      </h3>
      <div class="product__price">${productItem.price} ₽</div>
      <div class="product__address">${productItem.address.city}, ${productItem.address.street}</div>
      <div class="product__date">${productItem.publishDate}</div>
    </div>
  </li>`).join(``);
  productList.innerHTML = ``;
  productList.insertAdjacentHTML(`afterbegin`,productMarkup);
};

function onOpenPopupClick(evt){
  if(!(evt.target.closest(`img`)) && !(evt.target.closest(`a`))){
    return;
  };
  const indexProduct = evt.target.closest(`li`).dataset.index;
  renderPopup(products[indexProduct]);
  popup.style.display = `block`;

  popupCloseEvent();
};

function renderPopup(product){
  const currentPopup = `<div class="popup__inner">
    <button class="popup__close" type="button" aria-label="Закрыть">
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"/>
      </svg>
    </button>
    <div class="popup__date">${product.publishDate}</div>
    <h3 class="popup__title">${product.name}</h3>
    <div class="popup__price">${product.price} ₽</div>
    <div class="popup__columns">
      <div class="popup__left">
        <div class="popup__gallery gallery">
          <button class="gallery__favourite fav-add">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="gallery__main-pic">
            <img src="${product.photos}" width="520" height="340" alt="${product.name}">
          </div>
          <ul class="gallery__list">
            <li class="gallery__item gallery__item--active">
              <img src="${product.photos}" width="124" height="80" alt="${product.name}">
            </li>
            <li class="gallery__item">
              <img src="${product.photos}" width="124" height="80" alt="${product.name}">
            </li>
            <li class="gallery__item">
              <img src="${product.photos}" width="124" height="80" alt="${product.name}">
            </li>
            <li class="gallery__item">
              <img src="${product.photos}" width="124" height="80" alt="${product.name}">
            </li>
          </ul>
        </div>
        <ul class="popup__chars chars">
          <li class="chars__item">
            <div class="chars__name">Площадь</div>
            <div class="chars__value">${product.filters.area}</div>
          </li>
          <li class="chars__item">
            <div class="chars__name">Количество комнат</div>
            <div class="chars__value">${product.filters.roomsCount}</div>
          </li>
          <li class="chars__item">
            <div class="chars__name">Тип недвижимости</div>
            <div class="chars__value">${product.filters.type}</div>
          </li>
        </ul>
        <div class="popup__seller seller seller--good">
          <h3>Продавец</h3>
          <div class="seller__inner">
            <a class="seller__name" href="#">${product.seller.fullname}</a>
            <div class="seller__rating"><span>${product.seller.rating}</span></div>
          </div>
        </div>
        <div class="popup__description">
          <h3>Описание товара</h3>
          <p>${product.description}</p>
        </div>
      </div>
      <div class="popup__right">
        <div class="popup__map">
          <img src="img/map.jpg" width="268" height="180" alt="${product.address.city}, ${product.address.street}, дом ${product.address.building}">
        </div>
        <div class="popup__address">${product.address.city}, ${product.address.street}, дом ${product.address.building}</div>
      </div>
    </div>
  </div>`;
  popup.innerHTML = ``;
  popup.insertAdjacentHTML(`afterbegin`, currentPopup);
};

function popupCloseEvent(){
  const popupClose = popup.querySelector(`.popup__close`);
  popupClose.focus();
  popupClose.addEventListener(`click`, onClosePopupClick);

  document.addEventListener('keydown', function(evt) {
    const key = evt.key;
    if (key === "Escape"){
      onClosePopupClick();
    };
  });
};

function onClosePopupClick(){
  popup.style.display = `none`;
};

createProducts();
getProductList(products);
productList.addEventListener(`click`, onOpenPopupClick);