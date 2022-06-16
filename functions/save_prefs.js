"use strict";

const axios = require("axios");
const utils = require("./utils.js");

exports.handler = async function(event, context, callback) {
    try {
        if (!event.headers.cookie) {
            return {
                statusCode: 401,
                body: JSON.stringify({
                    message: "empty event.headers.cookie"
                })
            };
        } else {
            const loginToken = utils.getCookieValue(event.headers.cookie, "PDS_loginToken");
            if (!loginToken) {
                return {
                    statusCode: 401,
                    body: JSON.stringify({
                        message: "PDS_loginToken is not found in the cookie"
                    })
                };
            } else {
                const uiSettings = utils.getCookieValue(event.headers.cookie, "fluid-ui-settings");
                const preferences = JSON.parse(uiSettings).preferences || {};

                const result = await axios.post("http://localhost:3000/save_prefs", preferences || {}, {
                    headers: {
                        "Authorization": "Bearer " + loginToken
                    }
                });
                return {
                    statusCode: 200,
                    body: JSON.stringify(preferences)
                };
            }
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: e.response.data.message
            })
        };
    }
};
