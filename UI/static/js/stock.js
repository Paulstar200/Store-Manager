window.onload = () => {
    fetch("https://storemanagerapi2.herokuapp.com/api/v2/products", {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem("token")}`,
          'Content-type' : 'application/json;'
        }
      })
      
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);
                let output = `<tr>
                <th>Id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Inventory</th>
                <th>Min stock</th>
                <th>Price</th>
            </tr>`;
            let myArray = data['Products'];
            myArray.forEach(product => {
            let prod_id = product["product id"];
            let prod_num = parseInt(prod_id, 10);
            console.log(prod_num);
            output += `
            <tr>
                <td>${product["product id"]}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.inventory}</td>
                <td>${product.minimum_stock}</td>
                <td>${product.price}</td>
            </tr>
        ` 
            document.getElementById("t3").innerHTML = output;
        });
            localStorage.setItem("allproducts", JSON.stringify(data['Products']));
            var elem = document.getElementById("nullproducts");
            elem.remove();
        }
        else {
            alert("No products");
        }
        })
        .then(
            fetch('https://storemanagerapi2.herokuapp.com/api/v2/users', {
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
            
        )
}