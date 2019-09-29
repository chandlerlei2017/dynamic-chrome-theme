$("form").on("submit", function() {
  value = $("input").val();

  chrome.storage.local.clear();
  chrome.storage.local.set({"searchParams": value}, function() {
    console.log("Saved!")
  });
});

chrome.storage.local.get(null, function(result) {
  $("#display_params").append( `<p>${result.searchParams}</p>` );
});