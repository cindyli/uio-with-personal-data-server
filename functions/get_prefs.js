"use strict";

const axios = require("axios");
const utils = require("./utils.js");

exports.handler = async function(event, context, callback) {
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
            const preferences = await axios.get("http://localhost:3000/get_prefs", {
                headers: {
                    "Authorization": "Bearer " + loginToken
                }
            });
            return {
                statusCode: 200,
                body: JSON.stringify(preferences.data)
            };
        }
    }
};
