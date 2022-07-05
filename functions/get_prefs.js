"use strict";

const axios = require("axios");
const utils = require("./utils.js");
const pdsServer = "https://pds.fluidproject.org/";

exports.handler = async function(event, context, callback) {
    console.log("=== event.headers.cookie: ", event.headers.cookie);
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
            const preferences = await axios.get(pdsServer + "/get_prefs", {
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
