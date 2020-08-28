let hook = () => {
    var text
    let input = $("footer").find("._3FRCZ")[0]
    $(input).addClass("whatsupper-is-here-for-you");
    $(input).on('DOMSubtreeModified', () => {
        if ($(input).text().length == 1 && $(input).text() != text) {
            let range = document.createRange()
            let sel = window.getSelection()
            text = $(input).text().toUpperCase()
            $(input).text(text);
            range.setStart(input.childNodes[0], 1)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
        }
    });
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