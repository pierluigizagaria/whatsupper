chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        enabled:  true
    });
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (typeof message === 'object' && message.type === 'wake') {
        chrome.pageAction.show(sender.tab.id);
        chrome.storage.sync.get(['enabled'], (options) => {
            chrome.tabs.sendMessage(sender.tab.id, { type: 'changeState', enabled: options.enabled })
        }) 
    } 
});