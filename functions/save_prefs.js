"use strict";

const axios = require("axios");
const utils = require("./utils.js");

exports.handler = async function(event, context, callback) {
    try {
        const uiSettings = utils.getCookieValue(event.headers.cookie, "fluid-ui-settings");
        const preferences = JSON.parse(uiSettings).preferences || {};
        const loginToken = utils.getCookieValue(event.headers.cookie, "PDS_loginToken");

        const result = await axios.post("http://localhost:3000/save_prefs", preferences || {}, {
            headers: {
                "Authorization": "Bearer " + loginToken
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify(preferences)
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: e.response.data.message
            })
        };
    }
};
