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

document.getElementById("login").addEventListener("click", () => {
    window.location.href = "http://localhost:3000/sso/google";
});

document.getElementById("get_prefs").addEventListener("click", () => {
    fetch("/api/get_prefs").then(response => {
        response.json().then(res => {
            document.getElementById("preferences").innerHTML = "Received preferences: <br />" + JSON.stringify(res);
        });
    });
});

document.getElementById("save_prefs").addEventListener("click", () => {
    fetch("/api/save_prefs").then(response => {
        if (response.status === 200) {
            response.json().then(res => {
                document.getElementById("preferences").innerHTML = "Saved preferences: <br />" + JSON.stringify(res);
            });
        } else {
            response.json().then(res => {
                document.getElementById("preferences").innerHTML = "Error: " + res.error;
            });
        }
    });
});
