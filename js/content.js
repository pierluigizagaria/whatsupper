chrome.runtime.sendMessage({ type: 'showPageAction' });

function hook() {
    var text
    let input = $("footer").find("._3FRCZ")[0]
    $(input).addClass("whatsupper-is-here-for-you");
    $(input).on('DOMSubtreeModified', () => {
        chrome.storage.sync.get(['enabled'], (options) => {
            if (options.enabled && $(input).text().length == 1 && $(input).text() != text) {
                text = $(input).text().toUpperCase()
                $(input).text(text);
                setCaret(input, 1)
            }
        });
    });
}

function setCaret(input, index) {
    let range = document.createRange()
    let sel = window.getSelection()
    range.setStart(input.childNodes[0], index)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
}

let findPane = async () => {
    let pane
    let loop = setInterval(() => {
        if (pane = $('#pane-side')[0]) {
            $(pane).on('click', hook);
            clearInterval(loop);
        }
    }, 125);
}

findPane()