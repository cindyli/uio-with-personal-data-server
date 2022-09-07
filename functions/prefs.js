"use strict";

const axios = require("axios");
// const pdsServer = "http://localhost:3000";
const pdsServer = "https://pds.fluidproject.org";

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

exports.handler = async function(event, context, callback) {
    if (event.httpMethod !== "GET" && event.httpMethod !== "PUT") {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Invalid http method"
            })
        };
    } else if (!event.headers.cookie) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "empty event.headers.cookie"
            })
        };
    } else {
        const loginToken = getCookieValue(event.headers.cookie, "PDS_loginToken");
        if (!loginToken) {
            return {
                statusCode: 401,
                body: JSON.stringify({
                    message: "Unauthorized. Missing 'PDS_loginToken' cookie value."
                })
            };
        } else {
            if (event.httpMethod === "GET") {
                // Get preferences
                const preferences = await axios.get(pdsServer + "/get_prefs", {
                    headers: {
                        "Authorization": "Bearer " + loginToken
                    }
                });
                return {
                    statusCode: 200,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(preferences.data)
                };
            } else {
                // Save preferences
                const preferences = event.body ? JSON.parse(event.body) : {};

                await axios.post(pdsServer + "/save_prefs", preferences || {}, {
                    headers: {
                        "Authorization": "Bearer " + loginToken
                    }
                });
                return {
                    statusCode: 200,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(preferences)
                };
            }
        }
    }
};
