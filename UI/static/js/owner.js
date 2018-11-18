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
            let thediv = document.getElementById('description');
            let i = 0;
            for (i; i < respdata['users'].length; i++) {
                let username = localStorage.getItem('username');
                let role = localStorage.getItem('role');
                let usernameprof = document.getElementById('usernameprof');
                let usernamerole = document.getElementById('usernamerole');
            
                if(role === "attendant" && username === respdata['users'][i].username) {
                    let firstparagraph = document.getElementById('replacefirst');
                    let secondparagraph = document.getElementById('replacesecond');

                    firstparagraph.innerHTML = "<a href='attendant.html'><span id='firstspanreplace'>View Employees</span></a>";
                    secondparagraph.innerHTML = "<a href='stock.html'><span id='secondspanreplace'>View Stock</span></a>";

                    let secondDiv = document.getElementById('ownerreplace');
                    secondDiv.innerHTML = "<p><a href='sell_product.html'><span id='replacement'>Create sale</span></a></p>";
                    thediv.innerHTML = `<p class="subdescription">Logged in as: ${respdata['users'][i].username} (${respdata['users'][i].role})</p>`
                    usernameprof.innerHTML = `Username: ${respdata['users'][i].username}`;
                    usernamerole.innerHTML = `Role: ${respdata['users'][i].role}`;
                } else if(role === "admin" && username === respdata['users'][i].username) {
                    thediv.innerHTML = `<p class="subdescription">Logged in as: ${respdata['users'][i].username} (${respdata['users'][i].role})</p>`
                    usernameprof.innerHTML = `Username: ${respdata['users'][i].username}`;
                    usernamerole.innerHTML = `Role: ${respdata['users'][i].role}`;
                }
                console.log(respdata['users'][i].username);
            }
            
        }
        )
    
  }