(function () {



    const txtNombre = document.getElementById('nombre');
    const txtMail = document.getElementById('mail');
    const txtPassword = document.getElementById('password');
    const txtPasswordRepeat = document.getElementById('password-repeat');
    const btnSignUp = document.getElementById('btnSignUp');

    btnSignUp.addEventListener('click', e => {

        const name = txtNombre.value;
        const mail = txtMail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        const rpassword =  txtPasswordRepeat.value;

        const promise =  auth.createUserWithEmailAndPassword(mail, password);
        promise.catch((function (error) {
            // Handle Errors here.
            var errorCode = error.code + " ";
            var errorMessage = error.message;
            var msg = errorCode.concat(errorMessage);
            if (confirm(msg)) {
            }
        }));
    });

}());