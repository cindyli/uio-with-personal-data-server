"use strict";

const axios = require("axios");
const utils = require("./utils.js");

exports.handler = function(event, context, callback) {
    const loginToken = event.queryStringParameters.loginToken;
    const maxAge = event.queryStringParameters.maxAge;
    const refererUrl = event.queryStringParameters.refererUrl;

    if (!loginToken || !maxAge || !refererUrl) {
        callback(null, {
            statusCode: 401,
            body: JSON.stringify({
                message: "Missing required parameters"
            })
        });
    } else {
        const redirectUrl = refererUrl.replace(/\/$/, "");
        console.log("=== redirectUrl: ", redirectUrl);
        return callback(null, {
            statusCode: 302,
            headers: {
                "Location": redirectUrl,
                "Access-Control-Expose-Headers": "Set-Cookie",
                "Set-Cookie": "PDS_loginToken=" + loginToken + "; Path=/; Max-Age=" + maxAge
            }
        });
    }
};
