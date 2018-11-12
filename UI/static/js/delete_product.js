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
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.inventory}</td>
                        <td>${product.minimum_stock}</td>
                        <td>${product.price}</td>
                        
                        <td><button class="button" onclick = "openUpdateSection(${product.id})"><i class="fa fa-edit"></i></button></td>
                        <td><button class="button" onclick = "deleteProduct(${product.id})"><i class="fa fa-trash"></i></button></td>
                    </tr>
                `
                    document.getElementById("t2").innerHTML = output;
                });
                localStorage.setItem("allproducts", JSON.stringify(data['Products']))
            }
            else {
                alert("No products to fetch");
            }
        });
}