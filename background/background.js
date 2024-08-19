chrome.contextMenus.create({
  id: 'my-extension-config',
  title: '配置插件',
  contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'my-extension-config') {
    chrome.tabs.create({ url: chrome.runtime.getURL('options/options.html') });
  }
});

// background.js
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install' || details.reason === 'update') {
    chrome.storage.sync.set({
      protocol: 'https',
      port: 4343,
      base_ip_prefix: '10.232'
    }, function() {
      console.log('Default settings have been set.');
    });
  }
});