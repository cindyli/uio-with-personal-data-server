"use strict";

const axios = require("axios");
const utils = require("./utils.js");

exports.handler = async function(event, context, callback) {
    const loginToken = event.queryStringParameters.loginToken;
    const maxAge = event.queryStringParameters.maxAge;
    const refererUrl = event.queryStringParameters.refererUrl;

    if (!loginToken || !maxAge || !refererUrl) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Missing required parameters"
            })
        };
    } else {
        console.log("=== refererUrl: ", refererUrl);
        console.log("=== loginToken: ", loginToken);
        console.log("=== maxAge: ", maxAge);
        return {
            statusCode: 302,
            headers: {
                "Location": refererUrl,
                "Access-Control-Expose-Headers": "Set-Cookie",
                "Set-Cookie": "PDS_loginToken=" + loginToken + "; Path=/; Max-Age=" + maxAge
            }
        };
    }
};
