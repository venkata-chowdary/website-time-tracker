let isActive = true;
let lastActiveTime = Date.now();

window.addEventListener('focus', () => {
    isActive = true;
    lastActiveTime = Date.now();
});

window.addEventListener('blur', () => {
    if (isActive) {
        const elapsedTime = Date.now() - lastActiveTime;
        chrome.runtime.sendMessage({ type: 'trackTime', url: window.location.href, time: elapsedTime }, (response) => {
            console.log('Message sent to background script');
        });
    }
    isActive = false;
});
