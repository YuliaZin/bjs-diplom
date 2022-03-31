"use strict"

let userForm = new UserForm();

userForm.loginFormCallback = (data) => { 
    ApiConnector.login(data, callback => {
        if (callback.success === true) {
            location.reload();
            console.log("Авторизация прошла успешно");
        } else {
            userForm.setLoginErrorMessage(callback.error);
        }
    })
}

userForm.registerFormCallback = data => {
    ApiConnector.register(data, callback => {
        if (callback.success === true) {
            location.reload();
            console.log("Регистрация прошла успешно");
        } else {
            user.setRegisterErrorMessage(callback.error);
        }
    })
}