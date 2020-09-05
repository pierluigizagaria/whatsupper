chrome.runtime.sendMessage({ type: 'showPageAction' });

var hook = function() {
    let input = document.querySelector('footer').querySelector('._3FRCZ')
    let observer = new MutationObserver(keyTyped);
    input.classList.add('whatsupper-is-here-for-you');
    observer.observe(input, { subtree: true, characterDataOldValue: true});
}

var keyTyped = function(mutation){
    chrome.storage.sync.get(['enabled'], (options) => {
        let node = mutation[0].target
        if (options.enabled && mutation[0].oldValue == '') {
            node.nodeValue = node.nodeValue.charAt(0).toUpperCase() + node.nodeValue.slice(1)
            setCaret(node, node.nodeValue.length)
        }
    });
}

var setCaret = function(target, position) {
    let range = document.createRange()
    let sel = window.getSelection()
    range.setStart(target, position)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
}

var findPane = async function() {
    let pane
    let loop = setInterval(() => {
        if (pane = $('#pane-side')[0]) {
            $(pane).on('click', hook);
            clearInterval(loop);
        }
    }, 125);
}

findPane()