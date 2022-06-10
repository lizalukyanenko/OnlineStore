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

const productList = document.querySelector(`.results__list`);
const popup = document.querySelector(`.popup`);
const gallery = document.querySelector(`.gallery__list`);

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
      <img src="${productItem.photos[0]}" width="318" height="220" alt="${productItem.name}">
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

productList.addEventListener(`click`, onOpenPopupClick);

// рандомное создание продуктов
// createProducts();
// getProductList(products);

getData(URL, onLoad, onError);