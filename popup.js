chrome.storage.local.get(null, function(result) {
  $("#display_params").append( `<p>${result.searchParams}</p>` );

  if (result.urls === undefined) {
    return;
  }

  console.log(result.urls);

  for (url of result.urls) {
    $("#display_urls").append( `<p>${url}</p>` );
  }
});

$("#search-form").on("submit", function() {
  value = $("#search_params").val();

  chrome.storage.local.remove("page");
  chrome.storage.local.set({"searchParams": value}, function() {
    console.log("Saved!")
  });
});

$("#urls-form").on("submit", function() {
  value = $("#urls").val();

  chrome.storage.local.get(null, function(result) {
    let test = [];

    if (result.urls != undefined) {
      test = result.urls
    }

    test.push(value)

    chrome.storage.local.set({"urls": test}, function() {
      console.log("Saved!")
    });
  });
});