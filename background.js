chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'trackTime') {
        const { url, time } = message
        console.log(`Received trackTime message for ${url} with time ${time}ms`);

        const domain = extractDomain(url);
        chrome.storage.local.get({ trackedTime: {} }, data => {
            const trackedTime = data.trackedTime || {};
            if (trackedTime[domain]) {
                trackedTime[domain] += time;
            }
            else {
                trackedTime[url] = time;
            }

            chrome.storage.local.set({ trackedTime }, () => {
                console.log(`Time tracked for ${domain}: ${time}ms`);
            });
        })
    }
})

function extractDomain(url) {
    const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im;
    const match = url.match(domainRegex);
    return match && match[1];
}