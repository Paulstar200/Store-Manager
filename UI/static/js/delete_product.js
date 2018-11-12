const deleteproduct = (productId) => {
    let confirmation = confirm("Are you sure you want to delete this entry?");
    if(confirmation == true){
      fetch( `https://storemanagerapi2.herokuapp.com/api/v2/products/${productId}`, {
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