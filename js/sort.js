const sortList = document.querySelector(`.sorting__order-list`);

function sortByField(field) {
  return (a, b) => Number(a[field]) > Number(b[field]) ? 1 : -1;
}

function onSortListClick(evt){
  const button = evt.target.closest(`input`);
  if(!button){
    return;
  }
  const field = button.value;
  
  if(field === `popular`){
    getProductList(currentProducts.sort(sortByField(`rating`)));

    // currentProducts.forEach(element => {
    //   console.log(element.seller.rating);
    // });
    // console.log(`end`);
  };
  if(field === `cheap`){
    getProductList(currentProducts.sort(sortByField(`price`)));
  };
  if(field === `new`){
    getProductList(currentProducts.sort(sortByField(`publishDate`)));
  };
}

sortList.addEventListener(`click`, onSortListClick);