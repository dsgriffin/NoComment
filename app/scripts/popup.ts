// Trigger options panel if selected by user.
document.getElementById('options').onclick = (): void => {
  chrome.runtime.openOptionsPage();
};