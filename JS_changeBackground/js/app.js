const color = ["green", "yellow", "blue", "#f15025", "rgba(125,125,125,0.5)"];

const btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  let random = Math.floor(Math.random() * color.length);
  const body = document.body;
  body.style.background = color[random];
});
