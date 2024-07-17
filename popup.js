// popup.js

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('trackedTime', data => {
        const trackedTime = data.trackedTime || {};
        const trackedDataElement = document.getElementById('trackedData');
        trackedDataElement.innerHTML = '<ul>' +
            Object.entries(trackedTime).map(([url, time]) => `<li>${url}: ${time}ms</li>`).join('') +
            '</ul>';
    });
});
