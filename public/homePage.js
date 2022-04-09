"use strict";

let logoutBtn = new LogoutButton();

logoutBtn.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
 //           console.log("Деавторизация прошла успешно");
        }
    })
}

ApiConnector.current (response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data); 
    } 
})

// Получение текущих курсов валюты
let ratesBoard = new RatesBoard();

function getCurrencyRate() {
    ApiConnector.getStocks (response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}

getCurrencyRate();

setInterval(getCurrencyRate, 6000);

// Операции с деньгами
let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс пополнен");            
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация произведена");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Отправка произведена");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

// Работа с избранным

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    } else {
        console.log("Начальный список избранного не запрошен");
    }
    
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь добавлен в список избранных");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удален из списка избранных");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}