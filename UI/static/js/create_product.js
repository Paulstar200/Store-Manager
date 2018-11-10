let createProductUrl = 'https://storemanagerapi2.herokuapp.com//api/v2/products';

const product_form = document.getElementById('productform');


const createProduct = () => {
    fetch(createProductUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: document.getElementById('createname').value,
        inventory: document.getElementById('createinventory').value,
        price: document.getElementById('createprice').value,
        minimum_stock: document.getElementById('createstock').value,
        category: document.getElementById('createcategory').value
      }),
      headers: {
        'Content-type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === "Product created successfully"){
            
            window.location.href = "../UI/individual.html";
        } else{
            throw new Error(data.message);
        }
        console.log(data);
    })
  }
