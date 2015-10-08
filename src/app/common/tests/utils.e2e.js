(function () {
    "use strict";

    var getRandomString = function (characterLength) {
        var randomText = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < characterLength; i++){
            randomText += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return randomText;
    };

    var loginUser = function (browser, username, pwd) {
        var email, password, loginButton;

        browser.get("/#/login");

        email = element(by.name("email"));
        password = element(by.name("password"));
        loginButton = element(by.id("login_btn"));

        email.clear().then(function () {
            email.sendKeys(username);
        });
        password.clear().then(function () {
            password.sendKeys(pwd);
        });
        loginButton.click();
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        browser.driver.sleep(browser.params.page_timeout);

        expect(element(by.linkText("Home")).isPresent()).toBe(true);
    };

    var logoutUser = function (browser) {
        browser.get("/#/logout");
        browser.waitForAngular();
        browser.driver.sleep(browser.params.page_timeout);
        expect(element(by.css("h2")).getText()).toEqual("Master Facility List V 2.0");
    };

    module.exports = {
        "getRandomString": getRandomString,
        "loginUser": loginUser,
        "logoutUser": logoutUser
    };

})();
