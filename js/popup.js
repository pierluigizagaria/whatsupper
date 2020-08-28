let texts = ["what's up?","What's up?"]
let lastWrite

function typeWriter(selector, text, callback) {
    let i = 0
    if (lastWrite) clearInterval(lastWrite)
    lastWrite = setInterval(() => {
        if (i < (text.length)) {
            document.querySelector(selector).innerHTML = text.substring(0, ++i) + '<span class="text-cursor" aria-hidden="true"></span>';
        } else if (typeof fnCallback == 'function') {
            clearInterval(lastWrite)
            callback()
        }
    }, 50)
}

function toggle() {
    let state = document.querySelector("input").checked
    chrome.storage.sync.set({enabled: state})
    showText(state)
}

function showText(state){
    typeWriter('#text', state ? texts[1] : texts[0])
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('input').addEventListener('click', toggle);

    chrome.storage.sync.get(['enabled'], (options) => {
        showText(options.enabled)
        document.querySelector('input').checked = options.enabled
    });
});