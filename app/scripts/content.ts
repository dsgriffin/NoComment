import { UserSettings, CommentHandling, UrlHandling, DynamicContentHandling } from './interfaces';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // The selector array - this can be expanded to target comments/comment sections on as many sites as possible.
  const selectorArray: ReadonlyArray<string> = [
    'body [id*="comment"]', 'body [class*="comment"]', '#disqus_thread', '[class*="replies-to"]',
    'div[aria-label^="Comment by"]'
  ];

  // The current URL (for allowlist/blocklist usage)
  const currentURL: string = document.location.href;

  let userSettings: UserSettings = {
    blockAllComments: request.blockAllComments,
    display: request.display,
    allowlist: request.allowlist,
    blocklist: request.blocklist
  };

  let comments: CommentHandling = {
    'getAll': document.querySelectorAll(selectorArray.join()),
    'hideAll': (): void => {
      for (let i of Array.from(comments.getAll).keys()) {
        if (userSettings.display === 'collapse') {
          (<HTMLElement>comments.getAll[i]).style.display = 'none';
        }
        else if (userSettings.display === 'hidden') {
          (<HTMLElement>comments.getAll[i]).style.visibility = 'hidden';
        }
      }
    }
  };

  let urlHandling: UrlHandling = {
    blockableContent: false,
    checkProtocol: (urlString: string): string => {
      if (urlString.search(/^http[s]?\:\/\//) === -1) {
        urlString = '*://' + urlString;
      }

      return urlString;
    }
  };

  let dynamicContentHandling: DynamicContentHandling = {
    'observeChanges': {
      'config': {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeFilter: ['id', 'class']
      },
      'mutations': new (<any>window).MutationObserver((): void => {
        let matches = document.querySelectorAll(selectorArray.join());

        for (let i of Array.from(matches).keys()) {
          if ((<HTMLElement>matches[i]).style.display !== 'none') {
            if (userSettings.display === 'collapse') { 
              (<HTMLElement>matches[i]).style.display = 'none'; 
            }
            else if (userSettings.display === 'hidden') { 
              (<HTMLElement>matches[i]).style.visibility = 'hidden'; 
            }
          }
        }
      })
    }
  }

  const isNotInAllowList = (): boolean => {
    const allowlist: any = userSettings.allowlist;

    for (let i of allowlist.keys()) {
      let structuredURL: string = urlHandling.checkProtocol(allowlist[i].toString());
      let regexURL: RegExp = new RegExp(structuredURL.replace(/\./g, '\\.').replace(/\*/g, '.+') + '/?$');

      if (regexURL.test(currentURL)) {
        return false;
      }
    }

    return true;
  };

  const isInBlockList = (): boolean => {
    const blocklist: any = userSettings.blocklist;

    for (let i of blocklist.keys()) {
      let structuredURL: string = urlHandling.checkProtocol(blocklist[i].toString());
      let regexURL: RegExp = new RegExp(structuredURL.replace(/\./g, '\\.').replace(/\*/g, '.+') + '/?$');

      if (regexURL.test(currentURL)) {
        return true;
      }
    }

    return false;
  };

  if (userSettings.blockAllComments) {
    // If all comments are set to be blocked by default,
    // Check whether the current URL is in Allow List and take appropriate action.
    if (isNotInAllowList()) {
      // It is necessary to show page action.
      urlHandling.blockableContent = true;
      // Observe any additional elements that match selectorArray
      dynamicContentHandling.observeChanges.mutations.observe(document.body, dynamicContentHandling.observeChanges.config);
      // This URL/URL pattern is not Allow List - loop through all comments on page and hide (depending on user visual setting).
      comments.hideAll();
    }
  }
  else {
    if (isInBlockList()) {
      // It is necessary to show page action.
      urlHandling.blockableContent = true;
      // Observe any additional elements that match selectorArray
      dynamicContentHandling.observeChanges.mutations.observe(document.body, dynamicContentHandling.observeChanges.config);
      // Current URL is in Block List - hide all comments.
      comments.hideAll();
    }
  }
  // Need to include whether or not the current page contains blockable content, so that the page action can be displayed.
  sendResponse({ 
    'blockableContent': urlHandling.blockableContent, 
    'commentsLength': comments.getAll.length 
  });
});