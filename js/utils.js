let hideToastTimeout;

const toastDivId = 'toast_box_text';
function toastMessage(text, time = 3000) {
    let toast_box = document.getElementsByClassName('toast_box')[0];
    if (!toast_box) {
        toast_box = document.createElement('div');
        toast_box.className = 'toast_box';
        document.body.appendChild(toast_box);
    }
    let toast_p = document.getElementById(toastDivId);
    if (!toast_p) {
        toast_p = document.createElement('p');
        toast_p.id = toastDivId;
        toast_box.appendChild(toast_p);
    }
    toast_p.innerHTML = text;

    // toast_box.style.animation = 'show 1.5s';
    toast_box.style.display = 'inline-block';
    if (hideToastTimeout != null) {
        clearTimeout(hideToastTimeout);
    }
    hideToastTimeout = setTimeout(function () {
        // toast_box.style.animation = 'hide 1.5s' ;
        setTimeout(function () {
            toast_box.style.display = 'none';
        }, 100);
    }, time);
}

function formatTimestamp(ts) {
    let date;
    if (typeof ts === 'number') {
        date = new Date(ts);
    } else {
        date = new Date(parseInt(ts));
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const milliSecond = date.getMilliseconds();
    return year
        + '-' + fill(month)
        + '-' + fill(day)
        + ' ' + fill(hour)
        + ':' + fill(minute)
        + ':' + fill(second)
        + ':' + fill(milliSecond, 3);
}

function fill(value, length = 2) {
    if (value === null || value === undefined) {
        return '';
    }
    const text = value.toString();
    if (text.length >= length) {
        return text;
    }
    return '0'.repeat(length - text.length) + text;
}

function simplifyUrl(url) {
    const indexOf = url.indexOf('?');
    let result = '';
    if (indexOf > 0) {
        result = url.substr(0, indexOf + 1);
        const arr = url.substr(indexOf + 1).split('&');
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            const kv = arr[i].split('=');
            if (kv.length > 1 && kv[1].length > 0) {
                newArr.push(kv[0] + '=' + kv[1]);
            }
        }
        result = result + newArr.join('&');
    } else {
        result = url;
    }
    return result;
}

const copyDocId = 'copy_doc_input';
function copyText(text) {
    let urlInput = document.getElementById(copyDocId);
    if (!urlInput) {
        urlInput = document.createElement('input');
        urlInput.id = copyDocId;
        document.body.appendChild(urlInput);
    }
    urlInput.type = 'text';
    try {
        urlInput.value = text;
        urlInput.select();
        if (document.execCommand('copy')) {
            return true;
        }
    } finally {
        urlInput.type = 'hidden';
    }
    return false;
}
