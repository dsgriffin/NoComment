// Sync user settings + show the page action icon if there are comments being blocked on the current tab
chrome.tabs.onUpdated.addListener((tabId: number, info: any): void => {
  chrome.storage.sync.get({
    settings: {
      blockComments: true,
      visualDisplay: 'collapse'
    },
    allowlist: [],
    blocklist: []
  }, (optionsStorage: Object): void => {
    if (info.status === 'complete') {
      chrome.tabs.sendMessage(tabId, optionsStorage, response => {
        if (response.blockableContent && response.commentsLength > 0) {
          chrome.pageAction.show(tabId);
        }
      });
    }
  });
});
