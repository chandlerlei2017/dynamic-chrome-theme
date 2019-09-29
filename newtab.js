function get_images() {
  width = window.innerWidth;
  height = window.innerHeight;
  apiKey = "13779592-974f51385386ce7d8ca9c6c5d";
  searchParams = "space+wallpaper"
  perPage = 10;
  var page;
  saved = {};

  chrome.storage.local.get("page", function(result) {
    page = result.page;

    $.ajax({
      url: `https://pixabay.com/api/?key=${apiKey}&q=${searchParams}&min_width=${width}&min_height=${height}&per_page=${perPage}&page=${page}`,
      type: "GET",
      success: (data) => {
        saved = {
          "index": 1,
          "width": width,
          "height": height,
          "total": data.hits.length,
          "hits": data.hits.map( x => x.largeImageURL),
        }
        set_storage(saved);
        set_image(saved.hits[0])
      }
    });
  });
}

function set_storage(obj) {
  chrome.storage.local.set(obj, function() {
    console.log("Saved!")
  });
}

function set_image(url) {
  $( "body" ).css({
    "background": `url(${url})`,
    "background-repeat": "no-repeat",
    "background-position": "center center",
    "background-size": "cover",
    "height": "100%",
  });
  $( "#SIvCob" ).css({
    "color": "white"
  })
  console.log($( "body" ));
}

// chrome.storage.local.set({page: 1});
// get_images();

function page_load() {
  chrome.storage.local.get(null, function(result) {
    width = window.innerWidth;
    height = window.innerHeight;
    console.log(result)

    if( result.width != width || result.height != height){
      get_images();
    }
    else if (result.index < result.total) {
      set_image(result.hits[result.index]);
      set_storage({"index": result.index + 1});
    }
    else if(result.index >= result.total) {
      set_storage({
        "page": result.page + 1,
        "index": 0
      });
      get_images();
    }
  });
}

page_load();
