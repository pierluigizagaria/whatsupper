
function typeWriter(selector, text, i, fnCallback) {
    if (i < (text.length)) {
        document.querySelector(selector).innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        setTimeout(() => { typeWriter(selector, text, i + 1, fnCallback) }, 100);
    } else if (typeof fnCallback == 'function') fnCallback()
}

document.addEventListener('DOMContentLoaded', function () {

    setTimeout(() => {typeWriter('#text', "What's up?", 0)}, 200)
});