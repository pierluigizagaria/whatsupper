chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        enabled:  true
    });
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (typeof message === 'object' && message.type === 'showPageAction') {
        chrome.pageAction.show(sender.tab.id);
        chrome.storage.sync.get(['enabled'], (options) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'changeState', enabled: options.enabled })
            });
        }) 
    } 
});