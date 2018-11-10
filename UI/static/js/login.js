const uri = 'http://127.0.0.1:5000/api/v2/auth/login'


let header = new Headers();
header.append('Accept', 'application/json');
header.append('Content-type', 'application/json');


const login_form = document.getElementById('loginform');
login_form.addEventListener('submit', loginFetch);

let email = document.getElementById('email').value;
let password = document.getElementById('password').value;

let req = new Request(uri, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({email:email, password:password})
})


function loginFetch(e) {
    e.preventDefault();
    fetch(req)
    .then(
        (response) => response.json()
        )
    .then(
        (data) => {
            if (data.message === "Log in successful!")
            {
            window.location.href = "../owner.html";
        }
    })
    .catch((err) => console.log(err)
    )
}