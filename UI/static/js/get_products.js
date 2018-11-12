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
            let item = data['Products'][0];
            console.log(item);
            let ul = document.getElementById("myproducts");
            let li = document.createElement('li');
            let pn = document.createElement('p');
            let pr = document.createElement('p');
            let bt = document.createElement('button')
            pn.innerHTML = item.name;
            pr.innerHTML = item.price;
            bt.innerHTML = "Add to cart";
            li.append(pn);
            li.append(pr);
            li.append(bt);
            ul.append(li);
        } else{
            document.getElementById('error-prod').innerHTML = "No products yet";
        }
        
    }).catch( (err) => {
        console.log('ERROR:', err.message);
    })
  }
