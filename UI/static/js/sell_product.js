let sellProductUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/sales';

const product_form = document.getElementById('sale-form');

const sellProduct = () => {
    
    fetch(sellProductUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: document.getElementById('salename').value,
        quantity: document.getElementById('salequantity').value
      }),
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
        'Content-type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === "Sale successful"){
            alert("Sale successful \n Quantity remaining: " + data["remaining quantity"]);
            window.location.href = "../UI/sell_product.html";
            localStorage.setItem("id", data.SalesModel.id);
            document.getElementById('sell-create').innerHTML = data.message;
        } else{
            document.getElementById('error-sale').innerHTML = data.message;
        }
        console.log(data);
    })
  }
