chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        enabled:  true
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (typeof message === 'object' && message.type === 'showPageAction') {
        chrome.pageAction.show(sender.tab.id);
    }
});