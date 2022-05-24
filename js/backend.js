const URL = `https://morfey216.github.io/online-store-bd/bd.json`;

fetch(URL)
    .then(function (response) {
        return response.json();
  })
    .then(function (data) {
        console.log('data', data);
        getProductList(data);
  })
    .catch((error) => {
        console.log(`Ошибка: ${error}`)
  });


// async function loadData(){
// let response = await fetch(URL);
// let result = await response.json();
// console.log(result);
// }

// loadData();

// function getData(){
//     return new Promise(function(resolve,reject){
        
//     })
// }