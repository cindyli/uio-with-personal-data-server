// Shared utility functions

// Parse document.cookie to get the value of a given cookie name
// eslint-disable-next-line
getCookieValue = function (cookieName) {
    if (document.cookie === "") {
        return null;
    }

    const cookieStr = document.cookie
        .split("; ")
        .find(row => row.startsWith(cookieName + "="));
    return cookieStr ? cookieStr.split("=")[1] : null;
};
