const deleteproduct = (productId) => {
    let confirmation = confirm("Are you sure you want to delete this entry?");
    if(confirmation == true){
      fetch( `https://storemanagerapi2.herokuapp.com/api/v2/products`, {
        method: 'DELETE',
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem("token")}`,
          'Content-type' : 'application/json;'
        }
        })
        .then(response => response.json())
        .then(data => {
          if(data.message === "Deleted"){
        //    document.location.replace("./entry_list.html");
          }else{
            document.getElementById('message').innerHTML = data.message;
          }
      })
    }
  }

  window.onload = () => {
    fetch("https://storemanagerapi2.herokuapp.com/api/v2/products", {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem("token")}`,
          'Content-type' : 'application/json;'
        }
      })
        .then(res => res.json())
        .then(data => {
            if (data) {
                let output = `<tr>
                <th>
                    Id
                </th>
                <th>
                    Name
                </th>
                <th>
                    Category
                </th>
                <th>
                    Inventory
                </th>
                <th>
                    Min stock
                </th>
                <th>
                    Price
                </th>
                
                <th>
                </th>
                <th>
                </th>
            </tr>`;
            let myArray = data['Products']
                myArray.forEach(product => {
                    output += `
                    <tr>
                        <td>${product["product id"]}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.inventory}</td>
                        <td>${product.minimum_stock}</td>
                        <td>${product.price}</td>
                        
                        <td><button class="delete-btn" onclick = "deleteProduct(${product["product id"]})">Delete</button></td>
                        <td><button class="modify-btn" onclick = "openUpdateSection(${product["product id"]}))">Modify</button></td>
                    </tr>
                `
                    document.getElementById("t2").innerHTML = output;
                });
                localStorage.setItem("allproducts", JSON.stringify(data['Products']))
            }
            else {
                alert("No products yet");
            }
        });
}

function deleteProduct(productId) {
  let product_Id = productId
  let option = confirm("Do you really want to delete this product?");
  if (option) {
      fetch(`https://storemanagerapi2.herokuapp.com/api/v2/products/` + product_Id, {
          method: 'DELETE',
          headers: {
              'Authorization': localStorage.getItem("token")
          }
      })
          .then(res => res.json())
          .then(data => {
              alert(data.message || data.Message);
              window.location.reload();
          })
  }
}