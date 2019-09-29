chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.status === "complete" && tab.url === "chrome://newtab/") {
    // alert(tab.url);
    // body = $( "body" )
    // console.log(body.css("--logo-color"));
    // chrome.tabs.insertCSS(null, {file: "index.css"});

  }
});

// chrome.webNavigation.onCommitted.addListener(function(details) {
//   if(details.url === "chrome-search://local-ntp/local-ntp.html") {
//     chrome.tabs.executeScript(null, {file: "index.css"});
//   }
// });

