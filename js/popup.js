let texts = ["<span class='wavy'>w</span>hat's up?","What's up?"]

var typewriter = new Typewriter(document.getElementById('text'));

function toggle() {
    let state = document.querySelector("input").checked
    chrome.storage.sync.set({enabled: state})
    showText(state)
}

function showText(state){
    new Typewriter(document.getElementById('text'), {delay: 50})
        .typeString(state ? texts[1] : texts[0])
        .start()
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('input').addEventListener('click', toggle);
    chrome.storage.sync.get(['enabled'], (options) => {
        showText(options.enabled)
        document.querySelector('input').checked = options.enabled
    });
});