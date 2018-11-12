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
        if(data.message === "Successfully retrieved products"){
            let ul =document.querySelector('#myproducts');
            let df = new DocumentFragment();
            data.forEach( (product) => {
                let li = document.createElement('li');
                let pn = document.createElement('p');
                let pr = document.createElement('p');
                let bn = document.createElement('button');
                li.className = "individualprod";
                bn.className = "prodbtn";
                pn.textContent = ''.concat("Product: ", product.name);
                pr.textContent = ''.concat("Price: ", product.price);
                bn.textContent = "Add to cart";
                li.appendChild(pn);
                li.appendChild(pr);
                li.appendChild(bn);
                df.appendChild(li);
            } )
            ul.appendChild(df);
        } else{
            throw new Error(data.message);
        }
        console.log(data);
    }).catch( (err) => {
        console.log('ERROR:', err.message);
    })
  }
