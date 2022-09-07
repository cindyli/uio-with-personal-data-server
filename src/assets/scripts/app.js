/*
Copyright the Trivet copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/trivet/raw/master/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/trivet/raw/master/LICENSE.md.
*/

/* global getCookieValue */

"use strict";

// const pdsServer = "http://localhost:3000";
const pdsServer = "https://pds.fluidproject.org";

// Instantiate UI Options
const uio = fluid.prefs.instantiateUIO();

// Update DOM element states based on the isLoggedIn flag
const updateLoggedInState = function (isLoggedIn) {
    document.getElementById("login").disabled = isLoggedIn ? true : false;
    document.getElementById("logout").disabled = isLoggedIn ? false : true;
    document.getElementById("message").innerHTML = "You have logged " + (isLoggedIn ? "in." : "out.");
};

// The event listener for the "login" button click
document.getElementById("login").addEventListener("click", () => {
    window.location.href = pdsServer + "/sso/google";
});

// The event listener for the "logout" button click
document.getElementById("logout").addEventListener("click", () => {
    // Remove "PDS_loginToken" cookie value
    document.cookie = "PDS_loginToken=; max-age=-1; path=/";

    // Update UIO with preferences fetched from the unauthenticated store
    uio.store.settingsStore.applier.change("isLoggedIn", false);

    // Update buttons and messages on the webpage to the logged out state
    updateLoggedInState(false);
});

// On the page load, update buttons and messages on the webpage based on the logged in state
updateLoggedInState(!!getCookieValue("PDS_loginToken"));
