'use strict';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // The selector array - this can be expanded to target comments/comment sections on as many sites as possible.
  const selectorArray = ['body [id*="comment"]', 'body [class*="comment"]', '#disqus_thread', '[class*="replies-to"]'];
  // Main noComment object - contains User Settings, comment hide/show methods, URL parsing and more.
  const noComment = {
    'userSettings': {
      'blockAllComments': request.settings.blockComments,
      'display': request.settings.visualDisplay
    },
    'userLists': {
      'allowlist': request.allowlist,
      'blocklist': request.blocklist
    },
    'allComments': {
      'comments': document.querySelectorAll(selectorArray.join()),
      'hideAll': () => {
        for (let i of Array.from(noComment.allComments.comments).keys()) {
          if (noComment.userSettings.display === 'collapse') { noComment.allComments.comments[i].style.display = 'none'; }
          else if (noComment.userSettings.display === 'hidden') { noComment.allComments.comments[i].style.visibility = 'hidden'; }
        }
      }
    },
    'isNotInAllowList': () => {
      const allowlist = noComment.userLists.allowlist;
      const currentURL = document.location.href;

      for (let i of allowlist.keys()) {
        let structuredURL = noComment.urlHandling.checkProtocol(allowlist[i].toString());
        let regexURL = new RegExp(structuredURL.replace(/\./g, '\\.').replace(/\*/g, '.+') + '/?$');

        if (regexURL.test(currentURL)) { return false; }
      }

      return true;
    },
    'isInBlockList': () => {
      const blocklist = noComment.userLists.blocklist;
      const currentURL = document.location.href;

      for (let i of blocklist.keys()) {
        let structuredURL = noComment.urlHandling.checkProtocol(blocklist[i].toString());
        let regexURL = new RegExp(structuredURL.replace(/\./g, '\\.').replace(/\*/g, '.+')  + '/?$');

        if (regexURL.test(currentURL)) { return true; }
      }

      return false;
    },
    'urlHandling': {
      'checkProtocol': function (urlString) {
        if (urlString.search(/^http[s]?\:\/\//) === -1) { urlString = '*://' + urlString; }

        return urlString;
      }
    },
    'observeChanges': {
      'mutations': new window.MutationObserver(() => {
        let matches = document.querySelectorAll(selectorArray.join());

        for (let i of Array.from(matches).keys()) {
          if (matches[i].style.display !== 'none') {
            if (noComment.userSettings.display === 'collapse') { matches[i].style.display = 'none'; }
            else if (noComment.userSettings.display === 'hidden') { matches[i].style.visibility = 'hidden'; }
          }
        }
      }),
      'config': {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeFilter: ['id', 'class']
      }
    },
    'blockableContent': false
  };

  if (noComment.userSettings.blockAllComments) {
    // If all comments are set to be blocked by default,
    // Check whether the current URL is in Allow List and take appropriate action.
    if (noComment.isNotInAllowList()) {
      // It is necessary to show page action.
      noComment.blockableContent = true;
      // Observe any additional elements that match selectorArray
      noComment.observeChanges.mutations.observe(document.body, noComment.observeChanges.config);
      // This URL/URL pattern is not Allow List - loop through all comments on page and hide (depending on user visual setting).
      noComment.allComments.hideAll();
    }
  }
  else {
    if (noComment.isInBlockList()) {
      // It is necessary to show page action.
      noComment.blockableContent = true;
      // Observe any additional elements that match selectorArray
      noComment.observeChanges.mutations.observe(document.body, noComment.observeChanges.config);
      // Current URL is in Block List - hide all comments.
      noComment.allComments.hideAll();
    }
  }
  // Need to include whether or not the current page contains blockable content, so that the page action can be displayed.
  sendResponse({'blockableContent': noComment.blockableContent, 'commentsLength':noComment.allComments.comments.length});
});