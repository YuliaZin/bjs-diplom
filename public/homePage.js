"use strict";

let logoutBtn = new LogoutButton();

logoutBtn.action = () => {
    ApiConnector.logout(callback => {
        if (callback.success === true) {
            location.reload();
            console.log("Деавторизация прошла успешно");
        }
    })
}

ApiConnector.current (callback => {
    if (callback.success === true) {
        ProfileWidget.showProfile(callback.data); 
    } 
})

// Получение текущих курсов валюты
let ratesBoard = new RatesBoard();

function getCurrencyRate() {
    ApiConnector.getStocks (callback => {
        if (callback.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(callback.data);
        }
    })
}

getCurrencyRate();

setInterval(getCurrencyRate, 6000);

// Операции с деньгами
let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, callback => {
        if (callback.success === true) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, "Баланс пополнен");            
        } else {
            moneyManager.setMessage(callback.success, "Баланс не может быть пополнен");
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, callback => {
        if (callback.success === true) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, "Конвертация произведена");
        } else {
            moneyManager.setMessage(callback.success, "Конвертация не может быть произведена");
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, callback => {
        if (callback.success === true) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, "Отправка произведена");
        } else {
            moneyManager.setMessage(callback.success, "Отправка денег не может быть произведена");
        }
    })
}

// Работа с избранным

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(callback => {
    if (callback.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
    } else {
        console.log("Начальный список избранного не запрошен");
    }
    
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, callback => {
        if (callback.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
            moneyManager.setMessage(callback.success, "Пользователь добавлен в список избранных");
        } else {
            moneyManager.setMessage(callback.success, "Пользователь не может быть добавлен в список избранных");
        }
    })
}

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, callback => {
        if (callback.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
            moneyManager.setMessage(callback.success, "Пользователь удален из списка избранных");
        } else {
            moneyManager.setMessage(callback.success, "Пользователь не может быть удален из списка избранных");
        }
    })
}