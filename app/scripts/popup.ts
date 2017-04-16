'use strict';
// Trigger options panel if selected by user.
document.getElementById('options').onclick = function () {
  chrome.runtime.openOptionsPage();
};