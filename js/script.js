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

let product;

let products = [];

function randomProduct(){
  return product = {
    name: productName[Math.floor(Math.random()*productName.length)],
    description: productDescription[Math.floor(Math.random()*productDescription.length)],
    price: Math.floor(Math.floor(Math.random() * (2000000 - 250000 + 1) + 250000) / 100) * 100,
    category: productCategory,
    seller: {
      fullname: sellerFullname[Math.floor(Math.random()*sellerFullname.length)],
      rating: (Math.random() * 5).toFixed(1)
    },
    publishDate: randomDate(new Date(2020, 0, 1), new Date()),
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
}

function createProducts(){
  for (let i = 0; i < 7; i++) {
    products.push(randomProduct());
  }
}

createProducts();

function getProductList(products){
  const productList = document.querySelector(`.results__list`);
  const productMarkup = products.map(productItem =>
    `<li class="results__item product">
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
      <div class="product__price">${productItem.price}₽</div>
      <div class="product__address">${productItem.address.city}, ${productItem.address.street}</div>
      <div class="product__date">${productItem.publishDate.getFullYear()}</div>
    </div>
  </li>`).join(``);
  productList.innerHTML = ``;
  productList.insertAdjacentHTML(`afterbegin`,productMarkup);
}
getProductList(products);
