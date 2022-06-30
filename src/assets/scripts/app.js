/*
Copyright the Trivet copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/trivet/raw/master/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/trivet/raw/master/LICENSE.md.
*/

"use strict";

// If your website needs custom JavaScript, put it here.

const pdsServer = "http://localhost:3000";

document.getElementById("login").addEventListener("click", () => {
    window.location.href = pdsServer + "/sso/google";
});

document.getElementById("logout").addEventListener("click", () => {
    document.cookie = "PDS_loginToken=; max-age=-1; path=/";
    document.getElementById("message").innerHTML = "You have successfully logged out.";
});

document.getElementById("get_prefs").addEventListener("click", () => {
    fetch("/api/get_prefs").then(response => {
        showResponse(response, "Received preferences: <br />");
    });
});

document.getElementById("save_prefs").addEventListener("click", () => {
    fetch("/api/save_prefs").then(response => {
        showResponse(response, "Saved preferences: <br />");
    });
});


const showResponse = function (response, successHeader) {
    if (response.status === 200) {
        response.json().then(res => {
            document.getElementById("message").innerHTML = successHeader + JSON.stringify(res);
        });
    } else {
        response.json().then(error => {
            document.getElementById("message").innerHTML = JSON.stringify(error);
        });
    }
};
