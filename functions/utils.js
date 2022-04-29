"use strict";

// Reference: https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
const getCookieValue = function (cookieString, cookieName) {
    let cookieValue;
    cookieString.split(`;`).forEach(cookie => {
        let [ name, ...rest] = cookie.split(`=`);
        if (name.trim() === cookieName) {
            cookieValue = decodeURIComponent(rest.join(`=`).trim());
            return;
        }
    });
    return cookieValue;
};

module.exports = {
    getCookieValue
};
