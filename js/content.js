chrome.runtime.sendMessage({ type: 'wake' });
chrome.runtime.onMessage.addListener(message => {
    if (message.type == 'changeState') enabled = message.enabled
});

let enabled;

document.addEventListener('keydown', (event) => {
    let input = event.target
    let text = input.innerText
    if (enabled && text.replace(/\s/g, '').length === 0 && event.key.length === 1) {
        document.execCommand('insertText', input, event.key.toUpperCase());
        event.preventDefault()
    }
}, { passive: false });