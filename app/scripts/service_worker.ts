import { UserSettings } from "./interfaces";

// Sync user settings + show the page action icon if there are comments being blocked on the current tab
chrome.tabs.onUpdated.addListener((tabId: number, info: any): void => {
  chrome.storage.sync.get({
    blockAllComments: false,
    display: 'collapse',
    allowlist: [],
    blocklist: []
  }, (optionsStorage: UserSettings): void => {
    if (info.status === 'complete') {
      chrome.tabs.sendMessage(tabId, optionsStorage, response => {
        if (response.blockableContent && response.commentsLength > 0) {
          chrome.action.enable(tabId);
        }
      });
    }
  });
});
