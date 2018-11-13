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
                let output = `<tr>
                <th>Id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Inventory</th>
                <th>Min stock</th>
                <th>Price</th>
                <th>Delete</th>
                <th>Modify</th>
            </tr>`;
            let myArray = data['Products']
                myArray.forEach(product => {
                  console.log(product["product id"])
                  let prod_id = product["product id"];
                    output += `
                    <tr>
                        <td>${product["product id"]}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.inventory}</td>
                        <td>${product.minimum_stock}</td>
                        <td>${product.price}</td>
                        <td><button class="delete-btn" onclick = "deleteProduct(${prod_id})">Delete</button></td>
                        <td><button class="modify-btn" onclick = "updateProd(${product["product id"]})">Modify</button></td>
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
  let product_Id = productId;
  let answer = confirm("Would you like to delete this product?");
  if (answer) {
      fetch(`https://storemanagerapi2.herokuapp.com/api/v2/products/` + product_Id, {
          method: 'DELETE',
          headers: {
              'Authorization': localStorage.getItem("token"),
              'Content-type' : 'application/json'
          }
      })
          .then(res => res.json())
          .then(data => {
              alert(data['Message']);
              console.log(data['Message']);
              window.location.reload();
          })
  }
}

let updateform = document.getElementById("mod-form-prod");

if (updateform){
  updateform.addEventListener("submit", updateProduct);
}

function updateProduct(e) {
  e.preventDefault();
  let name = document.getElementById("form-name").value;
  let category = document.getElementById("form-category").value;
  let price = document.getElementById("form-price").value;
  let inventory = document.getElementById("form-inventory").value;
  let minimum_stock = document.getElementById("form-min_stock").value;
  product_Id = localStorage.getItem("productId");
  let option = confirm("Would you like to update this product?");
  if (option) {
      fetch(`https://storemanagerapi2.herokuapp.com/api/v2/products/` + product_Id, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token")
          },
          body: JSON.stringify({
              "name": name,
              "category": category,
              "price": price,
              "inventory": inventory,
              "minimum_stock": minimum_stock
          })
      })
          .then(res => res.json())
          .then(data => {
              let messagebox = document.getElementById("message-update");
              messagebox.innerHTML = '';
              messagebox.innerHTML = data.Message || data.message;
              if (data.Message == "Product updated successfully!"){
              window.location.reload();
              }
          })
          .catch((err) => console.log(err))
  }
}

function updateProd(productId) {
  
  let product_Id = productId;
  localStorage.setItem("productId", product_Id)
  fetch(`https://storemanagerapi2.herokuapp.com/api/v2/products/` + product_Id, {
      headers: {
          'Authorization': localStorage.getItem("token")
      }
  })
      .then(res => res.json())
      .then(data => {
        let item = data['product'];
          document.getElementById("form-name").value = item.name;
          document.getElementById("form-category").value = item.category;
          document.getElementById("form-price").value = item.price;
          document.getElementById("form-inventory").value = item.inventory;
          document.getElementById("form-min_stock").value = item.minimum_stock;
      });
}