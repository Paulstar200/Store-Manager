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
                <th>Delete</th>
                <th>Update</th>
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
                <td><button class="delete-btn" onclick = "deleteProduct(${prod_num})">Delete</button></td>
                <td><button class="modify-btn" onclick = "productUpdater(${prod_num})">Update</button></td>
            </tr>
        ` 
            document.getElementById("t2").innerHTML = output;
        });
        localStorage.setItem("allproducts", JSON.stringify(data['Products']))
        }
        else {
            alert("No products");
        }
        });
}

function deleteProduct(productId) {
  let prod_num = parseInt(productId, 10);
  console.log(prod_num);
  let answer = confirm("Would you like to delete this product?");
  if (answer) {
      fetch(`https://storemanagerapi2.herokuapp.com/api/v2/products/` + prod_num, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
              'Content-type' : 'application/json'
          }
      })
          .then(res => res.json())
          .then(data => {
              alert(data['message']);
              console.log(data['message']);
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
  product_Id = localStorage.getItem("productId");
  console.log(product_Id);
  let question = confirm("Would you like to update this product?");
  if (question) {
      fetch(`https://storemanagerapi2.herokuapp.com/api/v2/products/` + product_Id, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
              "name": document.getElementById("form-name").value,
              "category": document.getElementById("form-category").value,
              "price": document.getElementById("form-price").value,
              "inventory": document.getElementById("form-inventory").value,
              "minimum_stock": document.getElementById("form-min_stock").value
          })
      })
          .then(res => res.json())
          .then(data => {
              console.log(data["message"]);
              //console.log(data[0]);
              let errormessage = document.getElementById("update-error-msg");
              errormessage.innerHTML = '';
              errormessage.innerHTML = "<p>Insert proper values</p>";
              console.log(errormessage);
              if (data['message'] === "Product updated successfully!"){
                window.location.reload();
              }
          })
          .catch((err) => console.log(err))
  }
}

function productUpdater(productId) {
  let product_Id = productId;
  localStorage.setItem("productId", product_Id)
  fetch(`https://storemanagerapi2.herokuapp.com/api/v2/products/` + product_Id, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
  })
      .then(response => response.json())
      .then(data => {
        let item = data['product'];
          document.getElementById("form-name").value = item.name;
          document.getElementById("form-category").value = item.category;
          document.getElementById("form-price").value = item.price;
          document.getElementById("form-inventory").value = item.inventory;
          document.getElementById("form-min_stock").value = item.minimum_stock;
      });
}