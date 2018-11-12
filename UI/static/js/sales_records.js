let salesUrl = 'https://storemanagerapi2.herokuapp.com//api/v2/sales';

const salesRecords = () => {
    fetch(salesUrl, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
        'Content-type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === "Successfully retrieved the sales records"){
            let i;
            for (i = 0; i < data; i++) {
                document.getElementbyId("adminview").innerHTML += `
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                 `
            }
        } else{
            let table = document.getElementById('adminview');
            table.style.display = "none";
            document.getElementById('nosales').innerHTML = data.message;
           
        }
        console.log(data);
    })
  }
