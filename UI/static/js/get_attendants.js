let allAttendantsUrl = 'https://storemanagerapi2.herokuapp.com/api/v2/users';


const getAttendants = () => {
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
                prole.className = 'attendantdescription'
                li.className = 'attendantlist'

                
                li.append(pname);
                li.append(pId);
                li.append(pemail);
                li.append(prole);

                ul.append(li);
            }
            /* for (let num = 0; num < myArray.length; num++) {
                let item = myArray[num];
                console.log(item);
                let ul = document.getElementById("myproducts");
                let li = document.createElement('li');
                let pn = document.createElement('p');
                let pr = document.createElement('p');
                let bt = document.createElement('button');
                
                pn.innerHTML = "".concat("Product: ", item.name);
                pr.innerHTML = "".concat("Price: ", item.price);
                bt.innerHTML = "Add to cart";

                pr.classList.add("productdescription")
                pn.classList.add("productdescription")
                
                bt.classList.add('add-cart');
                li.append(pn);
                li.append(pr);
                li.append(bt);
                
                ul.append(li); 
            } */
 
        } else{
            document.getElementById('error-prod').innerHTML = "No products yet";
        }
        
    }).catch( (err) => {
        console.log('ERROR:', err.message);
    })
  }
