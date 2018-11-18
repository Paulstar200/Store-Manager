let sellProductUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/sales';
const userUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/users';

const product_form = document.getElementById('sale-form');

window.onload = () => {
  fetch(userUrl, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-type' : 'application/json'
    }
})
    .then(res => res.json())
    .then(respdata => {
        let thediv = document.getElementById('description');
        let i = 0;
        for (i; i < respdata['users'].length; i++) {
            let username = localStorage.getItem('username');
            if (username == respdata['users'][i].username) {
                thediv.innerHTML = `<p class="subdescription">Logged in as: ${respdata['users'][i].username} (${respdata['users'][i].role})</p>`
            }
            console.log(respdata['users'][i].username);
        }
        
    }
    )
}

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
            document.getElementById('error-sale').innerHTML = data["message"]["quantity"] || data.message;
            console.log(data["message"]);
        }
        console.log(data);
    })
    
  }
