function validateLoginForm() {
    var email = document.forms["login"]['email'].value;
    if (email == "") {
        alert("Email cannot be blank");
        return false;
    }

    var password = document.forms["login"]["password"].value;
    if (password == "") {
        alert("Password must be filled out");
        return false;
    }
}