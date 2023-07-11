
const scanPage = async (color) => {
    const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
    chrome.tabs.sendMessage(tab.id, {})
}

document.querySelector('#button').addEventListener('click', e => {
    scanPage()
})
