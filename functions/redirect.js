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
        // Adding a query string of "?a=a" is to work around the issue that netlify auto preserves existing
        // event.queryStringParameters in the next redirect url even though this is not desired. The work
        // around is to add another parameter.
        // See https://answers.netlify.com/t/redirect-doesnt-remove-query-params/31548/9    
        const redirectUrl = refererUrl + "?a=a";
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
