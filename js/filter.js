let currentProducts;

let checkboxList = [];
let types = [];
let roomCount;

setTimeout(() => {
  currentProducts = [...products];}, 300);


const filterTypeList = document.querySelector(`.filter__checkboxes-list`);
const checkboxesTypeList = filterTypeList.querySelectorAll(`input`);
const roomCountList = document.querySelector(`.filter__ram-list`);
const filterButton = document.querySelector(`.filter__button`);

function filterProductsByType(){
  currentProducts.splice(0);
  products.forEach(product => {
    types.forEach(type => {
      if (product.filters.type === type) {
        currentProducts.push(product);
      };
    });
  });
};

function filterProductsByArea(){
  const square = document.querySelector(`#square`);
  currentProducts = currentProducts.filter(product => product.filters.area >= Number(square.value));
};

function filterProductsByRoom(){
  if(Number(roomCount) > 0 && Number(roomCount) < 5){
    currentProducts = currentProducts.filter(product => product.filters.roomsCount === Number(roomCount));
    return;
  };
  if(roomCount === `5+`){
    currentProducts = currentProducts.filter(product => product.filters.roomsCount >= 5);
    return;
  };
  if(roomCount == `Любое`){
    currentProducts = currentProducts.filter(product => product.filters.roomsCount >= 0);
    return;
  };
};

// проверка: если ни один checkbox не checked, то не запускать фильтрацию по типу
function checker(){
  let chechedCount = 0;
  checkboxesTypeList.forEach(element => {
    if(element.checked){
      chechedCount++;
    }
  });
  if(chechedCount != 0){
    filterProductsByType();
  } else{
    currentProducts = [...products];
  }
};

function onCheckboxTypeClick(evt){
  const checkbox = evt.target.closest(`input`);
  if(!checkbox){
    return;
  }
  types.splice(0);
  checkboxesTypeList.forEach(element => {
    if(element.checked){
      types.push(element.value);
    }
  });
};

function onRadioRoomClick(evt){
  const room = evt.target.closest(`label`);
  if(!room){
    return;
  }
  roomCount = room.textContent;
};

function onFilterButtonClick(evt){
  evt.preventDefault();
  checker();
  
  filterProductsByArea();
  filterProductsByRoom();
  
  getProductList(currentProducts);
};


filterTypeList.addEventListener(`click`, onCheckboxTypeClick);
roomCountList.addEventListener(`click`, onRadioRoomClick);
filterButton.addEventListener(`click`, onFilterButtonClick);