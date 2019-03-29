(function() {
  let counterValue = 0;

  const counter = document.getElementById("counter");
  counter.style.color = "yellow";
  const buttons = document.querySelectorAll(".counterBtn");

  buttons.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      const value = event.target;
      if (value.classList.contains("prevBtn")) {
        counterValue = counterValue - 1;
      } else if (value.classList.contains("nextBtn")) {
        counterValue = counterValue + 1;
      }

      counter.style.color = "yellow";

      //chnage color
      if (counterValue === 0) {
        counter.style.color = "yellow";
      } else if (counterValue < 0) {
        counter.style.color = "red";
      } else {
        counter.style.color = "green";
      }
    });
  });
})();
