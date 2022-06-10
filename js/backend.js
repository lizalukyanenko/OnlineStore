const URL = `https://morfey216.github.io/online-store-bd/bd.json`;

let products = [];

function onLoad(data) {
  products = data.products.map((item, i) => {
    let product = Object.assign({}, item);
    product.index = i;
    product.publishDate = data.products[`${i}`][`publish-date`];
    product.filters.roomsCount = data.products[`${i}`][`filters`][`rooms-count`];
    return product;
  });
  getProductList(products);
};

function onError(error){
  const main = document.querySelector(`main`);
  const errorMarkup = `<h2 class="popup__title">Ошибка загрузки данных</h2>
    <div class="popup__description">
      <p>Код ошибки: <span>404</span>, проверьте адрес и попробуйте перезагрузить страницу</p>
    </div>`;
  main.innerHTML = ``;
  main.insertAdjacentHTML(`afterbegin`, errorMarkup);
  console.log(`Ошибка: ${error}`);
};

function getData(URL, onLoad, onError) {
  fetch(URL)
      .then(function (response) {
          return response.json();
    })
      .then(function (data) {
        onLoad(data);
    })
      .catch((error) => {
        onError(error);
    });
};