chrome.runtime.onStartup.addListener(function() { 
  chrome.action.disable(); 
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.disable();  
    chrome.storage.sync.set({
        enabled:  true
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostSuffix: "web.whatsapp.com" },
            }),
          ],
          actions: [new chrome.declarativeContent.ShowAction()],
        },
      ]);
    });
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (typeof message === 'object' && message.type === 'wake') {
        chrome.storage.sync.get(['enabled'], (options) => {
            chrome.tabs.sendMessage(sender.tab.id, { type: 'changeState', enabled: options.enabled })
        }) 
    } 
});