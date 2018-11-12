let allProductsUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/products';


const getProducts = () => {
    fetch(allProductsUrl, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
        'Content-type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        if(data['Products']){
            var myArray = data['Products'];
            console.log(myArray[0]);
            for (let num = 0; num < myArray.length; num++) {
                let item = myArray[num];
                console.log(item);
                let ul = document.getElementById("myproducts");
                let li = document.createElement('li');
                let pn = document.createElement('p');
                let pr = document.createElement('p');
                let bt = document.createElement('button');
                
                pn.innerHTML = "".concat("Product: ", item.name);
                pr.innerHTML = "".concat("Price: ", item.price);
                bt.innerHTML = "Add to cart";

                pr.classList.add("productdescription")
                pn.classList.add("productdescription")
                
                bt.classList.add('add-cart');
                li.append(pn);
                li.append(pr);
                li.append(bt);
                
                ul.append(li);
            }
 
        } else{
            document.getElementById('error-prod').innerHTML = "No products yet";
        }
        
    }).catch( (err) => {
        console.log('ERROR:', err.message);
    })
  }
