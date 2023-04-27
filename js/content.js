let enabled = false;

chrome.runtime.sendMessage({ type: 'wake' });

chrome.runtime.onMessage.addListener(message => {
    if (message.type == 'changeState') enabled = message.enabled;
});

document.addEventListener('keydown', (event) => {
    let input = event.target
    let text = input.innerText.replace(/\s/g, '');
    if (enabled && !event.ctrlKey && text.length === 0 && event.key.length === 1) {
        document.execCommand('insertText', input, event.key.toUpperCase());
        event.preventDefault();
    }
}, { passive: false });