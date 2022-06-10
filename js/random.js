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

function createProducts(){
    for (let i = 0; i < 7; i++) {
      products.push(randomProduct(i));
    };
};