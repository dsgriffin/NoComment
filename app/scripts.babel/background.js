'use strict';

// SYNC: User settings
// IF: There are comments, show page action

chrome.tabs.onUpdated.addListener(function(tabId, info) {
  chrome.storage.sync.get({
    'settings' : {
      'blockComments' : true,
      'visualDisplay' : 'collapse'
    },
    'allowlist' : [],
    'blocklist' : []
  },
  (optionsStorage) => {
    if(info.status === 'complete') {
      chrome.tabs.sendMessage(tabId, optionsStorage, (response) => {
        if (response.blockableContent && response.commentsLength > 0) { chrome.pageAction.show(tabId); }
      });
    }
  });
});