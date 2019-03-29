(function() {
  document
    .getElementById("message-form")
    .addEventListener("submit", function(e) {
      e.preventDefault();

      //Get Input Value
      let message = document.getElementById("message");
      const Value = message.value;

      //check empty value
      if (Value == "" || !Value) {
        const feedback = document.querySelector(".feedback");
        feedback.classList.add("show");
        setTimeout(function() {
          feedback.classList.remove("show");
        }, 2000);
      } else {
        //last Message
        document.querySelector(".message-content").textContent = Value;
        message.value = "";
      }
    });
})();
