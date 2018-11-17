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
            //console.log(respdata['users'][0].username);
            let thediv = document.getElementById('description');
            let i = 0;
            for (i; i < respdata['users'].length; i++) {
                //thediv.innerHTML = `<p>Logged in as: ${respdata['users'][i].username}</p>`
                let username = localStorage.getItem('username');
                let usernameprof = document.getElementById('usernameprof');
                let usernamerole = document.getElementById('usernamerole');
                if (username == respdata['users'][i].username) {
                    thediv.innerHTML = `<p class="subdescription">Logged in as: ${respdata['users'][i].username} (${respdata['users'][i].role})</p>`
                    usernameprof.innerHTML = `Username: ${respdata['users'][i].username}`;
                    usernamerole.innerHTML = `Role: ${respdata['users'][i].role}`;
                }
                console.log(respdata['users'][i].username);
            }
            
        }
        )
    
  }