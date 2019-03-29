(function() {
  //Customer Empty Array
  let customers = [];
  let index = 0;

  //Customer Function
  function Customer(name, img, comment) {
    this.name = name;
    this.img = img;
    this.comment = comment;
  }

  //Calling Customer Constructor function from this
  function createCustomer(name, img, comment) {
    let fullImagePath = `/img/customer-${img}.jpg`;
    customers.push(new Customer(name, fullImagePath, comment));
  }

  createCustomer("AKshay", 1, "AKshay Biyani The Billioanire Man of India");
  createCustomer("Rohit", 2, "Rohit Biyani The Billioanire Man of India");
  createCustomer("Anmol", 3, "Anmol Biyani The Billioanire Man of India");
  createCustomer("AKshay DD", 4, "AKshay Biyani The Billioanire Man of World");

  //Button Click
  document.querySelectorAll(".btn").forEach(function(item) {
    item.addEventListener("click", function(event) {
      event.preventDefault();
      const value = event.target.parentElement;
      if (value.classList.contains("prevBtn")) {
        index--;
        if (index < 0) {
          index = customers.length - 1;
        }
      } else if (value.classList.contains("nextBtn")) {
        index++;
        if (index > customers.length - 1) {
          index = 0;
        }
      }

      //Image
      document.getElementById("customer-img").src = customers[index].img;
      //Name
      document.getElementById("customer-name").textContent =
        customers[index].name;
      //Comment
      document.getElementById("customer-text").textContent =
        customers[index].comment;
    });
  });
})();
