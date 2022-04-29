"use strict";

const axios = require("axios");
const utils = require("./utils.js");

exports.handler = async function(event, context, callback) {
    const loginToken = utils.getCookieValue(event.headers.cookie, "PDS_loginToken");

    const preferences = await axios.get("http://localhost:3000/get_prefs", {
        headers: {
            "Authorization": "Bearer " + loginToken
        }
    });
    return {
        statusCode: 200,
        body: JSON.stringify(preferences.data)
    };
};
