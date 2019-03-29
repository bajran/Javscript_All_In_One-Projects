document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  //To Stop the browser default behaviour
  e.preventDefault();
}

//fetch bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var bookmarksResult = document.getElementById("bookMarksResult");
  bookmarksResult.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResult.innerHTML += `<div class="well">`+`<h3>${name}</h3>`
  }
}
