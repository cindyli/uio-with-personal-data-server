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
        return callback(null, {
            statusCode: 302,
            headers: {
                "Location": refererUrl,
                "Access-Control-Expose-Headers": "Set-Cookie",
                "Set-Cookie": "PDS_loginToken=" + loginToken + "; Path=/; Max-Age=" + maxAge
            }
        });
    }
};
