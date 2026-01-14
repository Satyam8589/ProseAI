// Content script loader - imports the main module
console.log('ProseAI: Content loader starting...');

(async () => {
  try {
    const src = chrome.runtime.getURL('content/content-main.js');
    console.log('ProseAI: Loading module from:', src);
    const contentScript = await import(src);
    console.log('ProseAI: Module loaded successfully');
  } catch (error) {
    console.error('ProseAI: Failed to load content script:', error);
  }
})();
