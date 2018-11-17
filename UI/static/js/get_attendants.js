let allAttendantsUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/users';


window.onload = () => {
    fetch(allAttendantsUrl, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
        'Content-type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === "Users retrieved successfully"){
            console.log(data.message)
            var myArray = data['users'];
            console.log(myArray);

            let thediv = document.getElementById('description');
            let i = 0;
            for (i; i < data['users'].length; i++) {
                let username = localStorage.getItem('username');
                if (username == data['users'][i].username) {
                    thediv.innerHTML = `<p class="subdescription">Logged in as: ${data['users'][i].username} (${data['users'][i].role})</p>`
                }
                console.log(data['users'][i].username);
            }
            
            for (let num = 0; num < myArray.length; num++) {
                let user = myArray[num];
                console.log(user);
                let ul = document.getElementById('theattendants');
                let li = document.createElement('li');
                let pemail = document.createElement('p');
                let prole = document.createElement('p');
                let pname = document.createElement('p');
                let pId = document.createElement('p');

                pId.innerHTML = "".concat("User Id: ", user.id);
                pname.innerHTML = "".concat("Username: ", user.username);
                pemail.innerHTML = "".concat("Email: ", user.email);
                prole.innerHTML = "".concat("Role: ", user.role);

                pId.className = 'attendantdescription';
                pname.className = 'attendantdescription';
                pemail.className = 'attendantdescription';
                prole.className = 'attendantdescription';
                li.classList.add('attendantlist');

                
                li.append(pname);
                li.append(pId);
                li.append(pemail);
                li.append(prole);

                ul.append(li);
            }
 
        } else{
            document.getElementById('error-prod').innerHTML = "No products yet";
        }
        
    }).catch( (err) => {
        console.log(err);
    })
  }
