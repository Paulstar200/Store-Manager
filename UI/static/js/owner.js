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
            let user1 = respdata.users[0]
            console.log(user1.username);

            let mydiv = document.getElementById("description");
            let plogin = document.createElement("p");

            plogin.className = "subdescription";
            plogin.innerHTML = "Logged in as: " + user1.username;
            mydiv.append(plogin);
        })
    
  }