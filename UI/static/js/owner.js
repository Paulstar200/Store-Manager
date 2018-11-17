const userUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/users';

window.onload = function getUser() {
    fetch(userUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-type' : 'application/json'
        }
    })
        .then(res => res.json())
        .then(respdata => {
            console.log(respdata['message']);
        }
        )
    
  }