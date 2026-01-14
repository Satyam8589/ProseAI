// Content script loader - imports the main module
(async () => {
  const src = chrome.runtime.getURL('content/content-main.js');
  const contentScript = await import(src);
})();
