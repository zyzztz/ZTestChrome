
const timestampRegex = /^\d{10,13}$/;
const actionMap = {
    "copy_url": function (params) {
        const url = simplifyUrl(params.text);
        if (copyText(url)) {
            toastMessage("Simplify url is copied! <br/>" + url);
        } else {
            toastMessage("Copy failed!" + url);
        }
    },
    "format_timestamp": function (params) {
        const ts = params.text;
        if (!ts || !timestampRegex.test(ts)) {
            toastMessage(ts + " is invalid timestamp string, require 10~13 numbers.");
            return;
        }
        const result = formatTimestamp(ts + '0'.repeat(13 - ts.length));
        toastMessage(result);
    },
    "toast_message": function (params) {
        toastMessage(params.text, params.time);
    }
};

chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        var func = actionMap[request.action];
        if (func) {
            func(request.params);
        }
    }
);
