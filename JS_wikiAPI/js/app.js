const loading = document.querySelector(".loading");
const searchForm = document.getElementById("searchForm");
const output = document.querySelector(".output");
const search = document.getElementById("search");
const feedback = document.querySelector(".feedback");

const base = `https://en.wikipedia.org/w/api.php`;
const url = `?action=query&format=json&list=search&srsearch=`;

//Feedback
function showFeedback(msg) {
  feedback.classList.add("showItem");
  feedback.innerHTML = msg;
  setTimeout(function() {
    feedback.classList.remove("showItem");
  }, 2000);
}

async function ajaxWiki(search) {
  output.innerHTML = "";
  loading.classList.add("showItem");
  const wikiURL = `${base}${url}${search}`;
  fetch(wikiURL, {
    method: "GET",
    mode: "no-cors",
    credentials: "same-origin"
  })
    .then(data => data.json())
    .then(dataf => console.log(dataf));
  //   const data = await fetch(wikiURL, (headers = { credentials: "same-origin" }));
  //   const actualData = data.json();
  //   console.log(actualData);
}

//Listening for search form
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const value = search.value.toLowerCase().trim();
  if (value == "" || value.length == 0) {
    showFeedback("Please Enter a valid search value");
  } else {
    search.value = "";
    //Calling serivce
    ajaxWiki(value);
  }
});
