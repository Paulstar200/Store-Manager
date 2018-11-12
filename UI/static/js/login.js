let loginUrl = 'https://storemanagerapi2.herokuapp.com//api/v2/auth/login';

const login_form = document.getElementById('loginform');


const loginUser = () => {
    fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      }),
      headers: {
        'Content-type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(loginData => {
        if(loginData.message === "Log in successful!"){
            localStorage.setItem('token', loginData.access_token);
            window.location.href = "../UI/owner.html";
        } else{
            document.getElementById('error-message').innerHTML = loginData.message;
        }
        console.log(loginData);
    })
  }
