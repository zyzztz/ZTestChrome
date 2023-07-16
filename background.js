
chrome.contextMenus.create({
    "title": "复制简化URL",
    "contexts": [ "page" ],
    "onclick": function (info, tab) {
        chrome.tabs.sendRequest(tab.id, {
            "action": "copy_url",
            "params": {
                "text": tab.url
            }
        })
    }
});

chrome.contextMenus.create({
    "title": "时间戳格式化",
    "contexts": [ "selection" ],
    "onclick": function (info, tab) {
        chrome.tabs.sendRequest(tab.id, {
            "action": "format_timestamp",
            "params": {
                "text": info.selectionText
            }
        })
    }
});


