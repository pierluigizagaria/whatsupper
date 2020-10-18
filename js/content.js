chrome.runtime.sendMessage({ type: 'wake' });
chrome.runtime.onMessage.addListener(message => {
    if (message.type == 'changeState') enabled = message.enabled
});

let enabled 

document.addEventListener('input', (event) => {
    let input = event.target
    let text = input.innerText
    if (enabled && event.inputType == 'insertText' && text.replace(/\s/g, '').length == 1) {
        input.innerText = text.charAt(0).toUpperCase() + text.slice(1);
        setCaret(input, 1)
    }
}, {passive: true})

var setCaret = function(target, position) {
    let range = document.createRange()
    let sel = window.getSelection()
    range.setStart(target, position)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
}
