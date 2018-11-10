let registerUrl = 'https://storemanagerapi2.herokuapp.com//api/v2/auth/signup';

const registerform = document.getElementById('userregistration');


const registerUser = () => {
    fetch(registerUrl, {
      method: 'POST',
      body: JSON.stringify({
        username: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role')
      }),
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
        'Content-type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === "User created successfully"){
            window.location.href = "../UI/owner.html";
        } else{
            throw new Error(data.message);
        }
        console.log(data);
    })
  }
