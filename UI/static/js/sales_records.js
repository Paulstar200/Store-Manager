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
                document.getElementbyId("adminview").innerHTML += ``
            }
            window.location.href = "../UI/viewrecords.html";

        } else{
            document.getElementById('nosales').innerHTML = "No sales records at the moment";
        }
        console.log(data);
    })
  }
